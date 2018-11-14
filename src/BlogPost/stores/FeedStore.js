import {action, observable, reaction, computed} from 'mobx';
import {normalize} from 'normalizr'
import {blogPostListSchema} from "./schemas";
import {createErrorFromResponse, blogPostService} from "../../Api";

export default class FeedStore {
    @observable blogPosts = {
        result: [],
        entities: {
            blogPosts: {}
        }
    };
    @observable paginationParameters = {
        pageSize: 15
    };
    @observable currentPageNumber = 0;
    @observable error = undefined;
    @observable pending = false;
    @observable refreshing = false;
    @observable authStore = undefined;
    @observable blogPostLikeStore = undefined;
    @observable shouldRefresh = false;
    @observable refreshingSchedule = undefined;

    @computed get currentUser() {
        return this.authStore.currentUser;
    }

    blogPostById = id => {
        return this.blogPosts.entities.blogPosts[id];
    };

    constructor(authStore, blogPostLikeStore) {
        this.authStore = authStore;
        this.blogPostLikeStore = blogPostLikeStore;

        reaction(
            () => this.shouldRefresh,
            shouldRefresh => {
                if (shouldRefresh && this.currentUser) {
                    this.refreshingSchedule = setInterval(this.refreshFeed, 20000);
                } else {
                    clearInterval(this.refreshingSchedule);
                }
            }
        );

        reaction(
            () => this.currentUser,
            currentUser => {
                this.blogPosts = {
                    result: [],
                    entities: {
                        blogPosts: {}
                    }
                };
                this.currentPageNumber = 0;

                if (currentUser && this.shouldRefresh) {
                    this.fetchFeed();
                }
            }
        );

        reaction(
            () => this.blogPostLikeStore.affectedBlogPostId,
            blogPostId => {
                if (blogPostId && this.blogPosts.entities.blogPosts[blogPostId]) {
                    this.blogPosts.entities.blogPosts[blogPostId].likedByCurrentUser
                        = Boolean(this.blogPostLikeStore.persistedBlogPostLikeId);
                    this.blogPosts.entities.blogPosts[blogPostId].numberOfLikes
                        = this.blogPostLikeStore.updatedNumberOfLikes;
                    this.blogPosts.entities.blogPosts[blogPostId].likeId
                        = this.blogPostLikeStore.persistedBlogPostLikeId;
                }
            }
        )
    }
    
    @action fetchFeed = () => {
        this.pending = true;
        this.error = undefined;

        return blogPostService.getFeed({
            ...this.paginationParameters,
            page: this.currentPageNumber
        }).then(response => {
            if (response.data.length !== 0) {
                const normalizedResponse = normalize(response.data, blogPostListSchema);
                this.blogPosts = {
                    ...this.blogPosts,
                    result: [
                        ...this.blogPosts.result,
                        ...normalizedResponse.result
                    ],
                    entities: {
                        blogPosts: {
                            ...this.blogPosts.entities.blogPosts,
                            ...normalizedResponse.entities.blogPosts
                        }
                    }
                };
                this.currentPageNumber = this.currentPageNumber + 1;
            }
        }).catch(error => {
            this.error = createErrorFromResponse(error.response);
        }).then(() => {
            this.pending = false;
        })
    };

    @action refreshFeed = () => {
        this.refreshing = true;
        this.error = undefined;

        return blogPostService.getFeed({
            ...this.paginationParameters,
            page: 0
        }).then(response => {
            if (response.data.length !== 0) {
                const normalizedResponse = normalize(response.data, blogPostListSchema);
                this.blogPosts = {
                    result: [
                        ...normalizedResponse.result,
                        ...this.blogPosts.result
                    ],
                    entities: {
                        blogPosts: {
                            ...this.blogPosts.entities.blogPosts,
                            ...normalizedResponse.entities.blogPosts
                        }
                    }
                }
            }
        })
    };

    @action setShouldRefresh = shouldRefresh => {
        this.shouldRefresh = shouldRefresh;
    }
}
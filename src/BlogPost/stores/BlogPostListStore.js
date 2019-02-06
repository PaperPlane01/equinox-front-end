import {normalize} from 'normalizr';
import {action, computed, observable, reaction, toJS} from 'mobx';
import {blogPostListSchema} from "./schemas";
import {mergeNormalizedBlogPosts} from "./mergeNormalizedBlogPosts";
import {blogPostService, createErrorFromResponse} from "../../Api";

export default class BlogPostListStore {
    @observable pending = false;
    @observable error = undefined;
    @observable pinnedBlogPosts = {
        result: [],
        entities: {
            blogPosts: {}
        }
    };
    @observable blogPosts = {
        result: [],
        entities: {
            blogPosts: {}
        }
    };
    @observable paginationParams = {
        pageSize: 10,
        sortingDirection: 'DESC',
        sortBy: 'id'
    };
    @observable currentPageNumber = 0;
    @observable blogStore = undefined;
    @observable authStore = undefined;
    @observable createBlogPostStore = undefined;
    @observable blogPostLikeStore = undefined;
    @observable pinBlogPostStore = undefined;
    @observable unpinBlogPostStore = undefined;

    @computed get blogId() {
        return this.blogStore.blogId;
    }

    @computed get persistedBlogPost() {
        return this.createBlogPostStore.persistedBlogPost;
    }

    constructor(blogStore, authStore, createBlogPostStore, blogPostLikeStore, pinBlogPostStore, unpinBlogPostStore) {
        this.blogStore = blogStore;
        this.authStore = authStore;
        this.createBlogPostStore = createBlogPostStore;
        this.blogPostLikeStore = blogPostLikeStore;
        this.pinBlogPostStore = pinBlogPostStore;
        this.unpinBlogPostStore = unpinBlogPostStore;

        reaction(
            () => this.paginationParams,
            () => {
                this.currentPageNumber = 0;
                this.blogPosts = {
                    result: [],
                    entities: {
                        blogPosts: {}
                    }
                };
                if (this.blogId) {
                    this.fetchBlogPosts();
                }
            }
        );

        reaction(
            () => this.blogId,
            () => {
                this.currentPageNumber = 0;
                this.blogPosts = {
                    result: [],
                    entities: {
                        blogPosts: {}
                    }
                };
                this.pinnedBlogPosts = {
                    result: [],
                    entities: {
                        blogPosts: {}
                    }
                };
                if (this.blogId) {
                    this.fetchPinnedBlogPosts();
                    this.fetchBlogPosts();
                }
            }
        );

        reaction(
            () => this.authStore.loginSuccess,
            () => {
                if (this.authStore.loginSuccess && !this.authStore.previousUser) {
                    this.currentPageNumber = 0;
                    this.blogPosts = {
                        result: [],
                        entities: {
                            blogPosts: {}
                        }
                    };
                    this.fetchBlogPosts();
                }
            }
        );

        reaction(
            () => this.authStore.currentUser,
            () => {
                if (this.blogId && (!this.authStore.currentUser
                        || (this.authStore.previousUser && (this.authStore.currentUser.id !== this.authStore.previousUser.id)))) {
                    this.currentPageNumber = 0;
                    this.blogPosts = {
                        result: [],
                        entities: {
                            blogPosts: {}
                        }
                    };
                    this.fetchBlogPosts();
                }
            }
        );

        reaction(
            () => this.persistedBlogPost,
            () => {
                if (this.persistedBlogPost && this.blogId == this.persistedBlogPost.blogId) {
                    this.blogPosts.result.unshift(this.persistedBlogPost.id);
                    this.blogPosts.entities.blogPosts[this.persistedBlogPost.id] = this.persistedBlogPost;
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
        );

        reaction(
            () => this.pinBlogPostStore.pinnedBlogPost,
            pinnedBlogPost => {
                if (pinnedBlogPost) {
                    this.pinnedBlogPosts.entities.blogPosts[pinnedBlogPost.id] = pinnedBlogPost;
                    this.pinnedBlogPosts.result.unshift(pinnedBlogPost.id);
                    if (this.blogPosts.entities.blogPosts[pinnedBlogPost.id]) {
                        this.blogPosts.entities.blogPosts[pinnedBlogPost.id].pinned = true;
                    }
                }
            }
        );

        reaction(
            () => this.unpinBlogPostStore.unpinnedBlogPost,
            unpinnedBlogPost => {
                if (unpinnedBlogPost) {
                    this.pinnedBlogPosts.result = this.pinnedBlogPosts.result.filter(blogPostId => blogPostId !== unpinnedBlogPost.id);
                    if (this.blogPosts.entities.blogPosts[unpinnedBlogPost.id]) {
                        this.blogPosts.entities.blogPosts[unpinnedBlogPost.id].pinned = false;
                    }
                }
            }
        )
    }

    @action setCurrentPageNumber = pageNumber => {
        this.currentPageNumber = pageNumber;
    };

    @action setPageSize = pageSize => {
        this.paginationParams = {
            ...this.paginationParams,
            pageSize
        }
    };

    @action setSortingDirection = sortingDirection => {
        this.paginationParams = {
            ...this.paginationParams,
            sortingDirection
        }
    };

    @action setSortBy = sortBy => {
        this.paginationParams = {
            ...this.paginationParams,
            sortBy
        }
    };

    @action fetchBlogPosts = () => {
        this.pending = true;

        return blogPostService.findByBlog(this.blogId, {
            ...this.paginationParams,
            page: this.currentPageNumber
        }).then(response => {
            if (response.data.length !== 0) {
                const normalizedResponse = normalize(response.data, blogPostListSchema);
                this.blogPosts = mergeNormalizedBlogPosts(normalizedResponse, this.blogPosts);
                this.currentPageNumber = this.currentPageNumber + 1;
            }
        }).catch(error => {
            this.error = createErrorFromResponse(error.response);
        }).then(() => {
            this.pending = false;
        });
    };

    @action deleteBlogPost = id => {
        this.blogPosts = {
            ...this.blogPosts,
            result: this.blogPosts.result.filter(blogPostId => blogPostId !== id)
        }
    };

    @action fetchPinnedBlogPosts = () => {
        return blogPostService.findPinnedByBlog(this.blogId)
            .then(response => {
                if (response.data.length !== 0) {
                    const normalizedResponse = normalize(response.data, blogPostListSchema);
                    console.log(normalizedResponse);
                    this.pinnedBlogPosts = mergeNormalizedBlogPosts(normalizedResponse, this.pinnedBlogPosts);
                    console.log(toJS(this.pinnedBlogPosts));
                }
            })
    }
}
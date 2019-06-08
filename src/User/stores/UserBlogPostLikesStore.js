import {action, reaction, computed, observable} from "mobx";
import {createErrorFromResponse, blogPostLikeService} from "../../Api";

export default class UserBlogPostLikesStore {
    @observable blogPostLikes = [];
    @observable pending = false;
    @observable error = undefined;
    @observable paginationParameters = {
        pageSize: 10,
        sortingDirection: 'desc',
        sortBy: 'id'
    };
    @observable currentPageNumber = 0;
    @observable authStore = undefined;
    @observable userProfileStore = undefined;
    @observable blogPostLikeStore = undefined;
    @observable deleteBlogPostStore = undefined;

    @computed
    get userId() {
        return this.userProfileStore.userId;
    }

    constructor(authStore, userProfileStore, blogPostLikeStore, deleteBlogPostStore) {
        this.authStore = authStore;
        this.userProfileStore = userProfileStore;
        this.blogPostLikeStore = blogPostLikeStore;
        this.deleteBlogPostStore = deleteBlogPostStore;

        reaction(
            () => this.userId,
            id => {
                this.reset();
                if (id) {
                    this.fetchBlogPostLikes();
                }
            }
        )

        reaction(
            () => authStore.currentUser,
            () => {
                if (this.userId) {
                    this.reset();
                    this.fetchBlogPostLikes();
                }
            }
        );

        reaction(
            () => deleteBlogPostStore.deletedBlogPostId,
            id => {
                if (id) {
                    this.removeBlogPost(id);
                }
            }
        );

        reaction(
            () => this.blogPostLikeStore.result,
            ({blogPostId, updatedNumberOfLikes, likeId}) => {
                this.setBlogPostLiked(blogPostId, likeId, updatedNumberOfLikes);
            }
        )
    }

    @action
    fetchBlogPostLikes = () => {
        this.pending = true;
        this.error = undefined;

        return blogPostLikeService.findByUser(
            this.userId,
            {
                ...this.paginationParameters,
                page: this.currentPageNumber
            }
        ).then(({data}) => {
            if (data.length !== 0) {
                this.blogPostLikes = [
                    ...this.blogPostLikes,
                    ...data
                ];
                this.currentPageNumber = this.currentPageNumber + 1;
            }
        }).catch(({response}) => {
            this.error = createErrorFromResponse(response);
        }).then(() => this.pending = false);
    };

    @action
    removeBlogPost = blogPostId => {
        this.blogPostLikes = this.blogPostLikes.filter(blogPostLike => blogPostLike.blogPost.id !== blogPostId);
    };

    @action
    setBlogPostLiked = (blogPostId, likeId, numberOfLikes) => {
        this.blogPostLikes = this.blogPostLikes
            .map(blogPostLike => {
                if (blogPostLike.blogPost.id === blogPostId) {
                    blogPostLike = {
                        ...blogPostLike,
                        blogPost: {
                            ...blogPostLike.blogPost,
                            likedByCurrentUser: Boolean(likeId),
                            likeId,
                            numberOfLikes
                        }
                    }
                }
                return blogPostLike;
            })
    };

    @action
    reset = () => {
        this.currentPageNumber = 0;
        this.blogPostLikes = [];
    }
}
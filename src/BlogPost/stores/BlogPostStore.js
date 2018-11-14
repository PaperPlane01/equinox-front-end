import {observable, action, reaction} from 'mobx';
import {blogPostService, createErrorFromResponse} from "../../Api";

export default class BlogPostStore {
    @observable blogPostId = undefined;
    @observable blogPost = undefined;
    @observable authStore = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable blogPostLikeStore = undefined;

    constructor(authStore, blogPostLikeStore) {
        this.authStore = authStore;
        this.blogPostLikeStore = blogPostLikeStore;

        reaction(
            () => this.blogPostId,
            () => {
                if (this.blogPostId) {
                    this.fetchBlogPost();
                }
            }
        );

        reaction(
            () => this.authStore.loginSuccess,
            () => {
                if (this.authStore.loginSuccess && !this.authStore.previousUser && this.blogPostId) {
                    this.fetchBlogPost();
                }
            }
        );

        reaction(
            () => this.authStore.currentUser,
            () => {
                if (this.blogPostId && (!this.authStore.currentUser
                    || (this.authStore.previousUser && (this.authStore.currentUser.id !== this.authStore.previousUser.id)))) {
                    this.fetchBlogPost();
                }
            }
        );

        reaction(
            () => this.blogPostLikeStore.affectedBlogPostId,
            blogPostId => {
                if (blogPostId && this.blogPost && this.blogPost.id === blogPostId) {
                    this.blogPost.likedByCurrentUser = Boolean(this.blogPostLikeStore.persistedBlogPostLikeId);
                    this.blogPost.numberOfLikes = this.blogPostLikeStore.updatedNumberOfLikes;
                    this.blogPost.likeId = this.blogPostLikeStore.persistedBlogPostLikeId;
                }
            }
        )
    }

    @action setBlogPostId = id => {
        this.blogPostId = id;
    };

    @action fetchBlogPost = () => {
        this.pending = true;
        this.error = undefined;

        return blogPostService.findById(this.blogPostId)
            .then(response => {
                this.blogPost = response.data;
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    };

    @action reset = () => {
        this.blogPostId = undefined;
        this.blogPost = undefined;
    };

    @action increaseNumberOfComments = () => {
        this.blogPost.numberOfComments = this.blogPost.numberOfComments + 1;
    };

    @action decreaseNumberOfComments = () => {
        this.blogPost.numberOfComments = this.blogPost.numberOfComments - 1;
    }
}
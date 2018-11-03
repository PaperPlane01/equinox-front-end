import {observable, action, reaction} from 'mobx';
import {blogPostService, createErrorFromResponse} from "../../Api";

export default class BlogPostStore {
    @observable blogPostId = undefined;
    @observable blogPost = undefined;
    @observable authStore = undefined;
    @observable pending = false;
    @observable error = undefined;

    constructor(authStore) {
        this.authStore = authStore;

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
        )
    }

    @action setBlogPostId = id => {
        this.blogPostId = id;
    };

    @action setBlogPostLikedByCurrentUser = (blogPostId, likedByCurrentUser, likeId) => {
        if (this.blogPost && this.blogPost.id === blogPostId) {
            this.blogPost.likedByCurrentUser = likedByCurrentUser;
            this.blogPost.likeId = likeId;
        }
    };

    @action setNumberOfLikes = (id, numberOfLikes) => {
        if (this.blogPost && this.blogPost.id === id) {
            this.blogPost.numberOfLikes = numberOfLikes;
        }
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
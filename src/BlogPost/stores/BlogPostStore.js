import {observable, action, reaction} from 'mobx';
import {blogPostService, createErrorFromResponse} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'authStore'},
        {propertyName: 'blogPostLikeStore'},
        {propertyName: 'pinBlogPostStore'},
        {propertyName: 'unpinBlogPostStore'}
    ],
    order: Component.Order.HIGH
})
class BlogPostStore {
    @observable blogPostId = undefined;
    @observable blogPost = undefined;
    @observable authStore = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable blogPostLikeStore = undefined;
    @observable pinBlogPostStore = undefined;
    @observable unpinBlogPostStore = undefined;

    constructor() {
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
        );

        reaction(
            () => this.pinBlogPostStore.pinnedBlogPost,
            blogPost => {
                if (blogPost && this.blogPost && this.blogPost.id === blogPost.id) {
                    this.blogPost.pinned = true;
                }
            }
        );

        reaction(
            () => this.unpinBlogPostStore.unpinnedBlogPost,
            blogPost => {
                if (blogPost && this.blogPost && this.blogPost.id === blogPost.id) {
                    this.blogPost.pinned = false;
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

export default BlogPostStore;
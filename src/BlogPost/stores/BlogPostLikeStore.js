import {action, observable} from 'mobx';
import {blogPostLikeService, createErrorFromResponse} from "../../Api";

export default class BlogPostLikeStore {
    @observable pending;
    @observable error;
    @observable blogPostListStore = undefined;
    @observable blogPostStore = undefined;


    constructor(blogPostListStore, blogPostStore) {
        this.blogPostListStore = blogPostListStore;
        this.blogPostStore = blogPostStore;
    }

    @action createBlogPostLike = blogPostId => {
        this.pending = true;

        return blogPostLikeService.save({blogPostId})
            .then(response => {
                this.blogPostStore.setBlogPostLikedByCurrentUser(blogPostId, true, response.data.blogPostLikeId);
                this.blogPostStore.setNumberOfLikes(blogPostId, response.data.updatedNumberOfLikes);
                this.blogPostListStore.setBlogPostLikedByCurrentUser(blogPostId, true, response.data.blogPostLikeId);
                this.blogPostListStore.setNumberOfLikes(blogPostId, response.data.updatedNumberOfLikes);
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    };

    @action deleteBlogPostLike = (blogPostId, blogPostLikeId) => {
        this.pending = true;

        return blogPostLikeService.delete(blogPostLikeId)
            .then(response => {
                this.blogPostStore.setBlogPostLikedByCurrentUser(blogPostId, false);
                this.blogPostStore.setNumberOfLikes(blogPostId, response.data.updatedNumberOfLikes);
                this.blogPostListStore.setBlogPostLikedByCurrentUser(blogPostId, false);
                this.blogPostListStore.setNumberOfLikes(blogPostId, response.data.updatedNumberOfLikes);
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    };
}
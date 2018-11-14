import {action, observable} from 'mobx';
import {blogPostLikeService, createErrorFromResponse} from "../../Api";

export default class BlogPostLikeStore {
    @observable pending;
    @observable error;
    @observable persistedBlogPostLikeId = undefined;
    @observable updatedNumberOfLikes = undefined;
    @observable affectedBlogPostId = undefined;

    @action createBlogPostLike = blogPostId => {
        this.pending = true;

        return blogPostLikeService.save({blogPostId})
            .then(response => {
                this.updatedNumberOfLikes = response.data.updatedNumberOfLikes;
                this.persistedBlogPostLikeId = response.data.blogPostLikeId;
                this.affectedBlogPostId = blogPostId;
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
                this.affectedBlogPostId = undefined;
            })
    };

    @action deleteBlogPostLike = (blogPostId, blogPostLikeId) => {
        this.pending = true;

        return blogPostLikeService.delete(blogPostLikeId)
            .then(response => {
                this.updatedNumberOfLikes = response.data.updatedNumberOfLikes;
                this.persistedBlogPostLikeId = undefined;
                this.affectedBlogPostId = blogPostId;
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
                this.affectedBlogPostId = undefined;
            })
    };
}
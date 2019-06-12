import {action, observable} from 'mobx';
import {blogPostLikeService, createErrorFromResponse} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    order: Component.Order.LOW
})
class BlogPostLikeStore {
    @observable pending;
    @observable error;
    @observable persistedBlogPostLikeId = undefined;
    @observable updatedNumberOfLikes = undefined;
    @observable affectedBlogPostId = undefined;
    @observable result = {
        blogPostId: undefined,
        updatedNumberOfLikes: undefined,
        likeId: undefined
    };

    @action createBlogPostLike = blogPostId => {
        this.pending = true;

        return blogPostLikeService.save({blogPostId})
            .then(response => {
                this.updatedNumberOfLikes = response.data.updatedNumberOfLikes;
                this.persistedBlogPostLikeId = response.data.blogPostLikeId;
                this.affectedBlogPostId = blogPostId;
                this.result = {
                    blogPostId: blogPostId,
                    likeId: response.data.blogPostLikeId,
                    updatedNumberOfLikes: response.data.updatedNumberOfLikes
                };
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
                this.result = {
                    blogPostId: blogPostId,
                    likeId: undefined,
                    updatedNumberOfLikes: response.data.updatedNumberOfLikes
                };
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
                this.affectedBlogPostId = undefined;
            })
    };
}
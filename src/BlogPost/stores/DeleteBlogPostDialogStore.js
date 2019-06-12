import {action, observable} from 'mobx';
import {blogPostService, createErrorFromResponse} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'blogPostListStore'}
    ],
    order: Component.Order.HIGH
})
class DeleteBlogPostDialogStore {
    @observable error = undefined;
    @observable pending = undefined;
    @observable deleteBlogPostDialogOpened = undefined;
    @observable blogPostListStore = undefined;
    @observable blogPostId = undefined;
    @observable deletedBlogPostId = undefined;

    @action setDeleteBlogPostDialogOpened = opened => {
        this.deleteBlogPostDialogOpened = opened;
    };

    @action setBlogPostId = id => {
        this.blogPostId = id;
    };

    @action deleteBlogPost = () => {
        this.pending = true;

        return blogPostService.delete(this.blogPostId)
            .then(() => {
                this.blogPostListStore.deleteBlogPost(this.blogPostId);
                this.deleteBlogPostDialogOpened = false;
                this.deletedBlogPostId = this.blogPostId;
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            })
    }
}

export default DeleteBlogPostDialogStore;
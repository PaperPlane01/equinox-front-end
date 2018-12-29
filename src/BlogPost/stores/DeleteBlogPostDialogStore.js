import {action, observable} from 'mobx';
import {blogPostService, createErrorFromResponse} from "../../Api";

export default class DeleteBlogPostDialogStore {
    @observable error = undefined;
    @observable pending = undefined;
    @observable deleteBlogPostDialogOpened = undefined;
    @observable blogPostListStore = undefined;
    @observable blogPostId = undefined;
    @observable deletedBlogPostId = undefined;

    constructor(blogPostListStore) {
        this.blogPostListStore = blogPostListStore;
    }

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
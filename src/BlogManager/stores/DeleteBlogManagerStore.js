import {action, observable, computed, reaction} from 'mobx';
import {blogManagerService, createErrorFromResponse} from "../../Api";

export default class DeleteBlogManagerStore {
    @observable deleteBlogManagerDialogOpen = false;
    @observable managerId = undefined;
    @observable blogManagersStore = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable blogManagerDeleted = false;

    @computed get blogId() {
        return this.blogManagersStore.blogId;
    }

    constructor(blogManagersStore) {
        this.blogManagersStore = blogManagersStore;

        reaction(
            () => this.blogManagerDeleted,
            () => {
                this.deleteBlogManagerDialogOpen = false;
            }
        )
    }

    @action setDeleteBlogManagerDialogOpen = open => {
        this.deleteBlogManagerDialogOpen = open;
    };

    @action setBlogManagerId = managerId => {
        this.managerId = managerId;
    };

    @action deleteBlogManager = () => {
        this.pending = true;
        this.error = undefined;

        return blogManagerService.delete(this.blogId, this.managerId)
            .then(() => {
                this.blogManagerDeleted = true;
                this.blogManagersStore.removeBlogManager(this.managerId)
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            });
    }
}
import {action, observable, reaction} from 'mobx';
import {validateBlogManagerRole} from "../validation";
import {blogManagerService, createErrorFromResponse} from "../../Api";

export default class UpdateBlogManagerStore {
    @observable blogManagerId = undefined;
    @observable blogManager = undefined;
    @observable updateBlogManagerFormValues = {
        blogRole: undefined
    };
    @observable blogManagerError = undefined;
    @observable fetchingBlogManager = false;
    @observable blogManagerErrors = {
        blogRole: undefined
    };
    @observable submissionError = undefined;
    @observable submitting = false;
    @observable updateBlogManagerDialogOpen = false;
    @observable blogId = undefined;
    @observable persistedBlogManager = undefined;

    constructor() {
        reaction(
            () => this.blogId,
            () => {
                this.blogManagerId = undefined;
                this.persistedBlogManager = undefined;
                this.submissionError = undefined;
                this.updateBlogManagerFormValues = {blogRole: undefined};
                this.blogManagerErrors = {blogRole: undefined};
            }
        );

        reaction(
            () => this.blogManagerId,
            () => {
                if (this.blogManagerId) {
                    this.persistedBlogManager = undefined;
                    this.fetchBlogManager();
                }
            }
        );

        reaction(
            () => this.updateBlogManagerDialogOpen,
            open => {
                if (!open) {
                    this.persistedBlogManager = undefined;
                }
            }
        )
    }

    @action setBlogId = id => {
        this.blogId = id;
    };

    @action setBlogManagerId = id => {
        this.blogManagerId = id;
    };

    @action setUpdateBlogManagerDialogOpen = open => {
        this.updateBlogManagerDialogOpen = open;
    };

    @action setUpdateBlogManagerFormValue = (value, propertyName) => {
        this.updateBlogManagerFormValues[propertyName] = value;
    };

    @action fetchBlogManager = () => {
        this.blogManagerError = undefined;
        this.fetchingBlogManager = true;

        return blogManagerService.findByBlogAndId(this.blogId, this.blogManagerId)
            .then(response => {
                this.blogManager = response.data;
                this.updateBlogManagerFormValues = {
                    blogRole: response.data.blogRole
                };
            }).catch(error => {
                this.blogManagerError = createErrorFromResponse(error.response);
            }).then(() => {
                this.fetchingBlogManager = false;
            })
    };

    @action updateBlogManager = () => {
        if (this.isFormValid()) {
            this.submissionError = undefined;
            this.submitting = true;

            return blogManagerService.update(
                this.blogId,
                this.blogManagerId,
                this.updateBlogManagerFormValues.blogRole
            ).then(response => {
                this.persistedBlogManager = response.data;
            }).catch(error => {
                this.submissionError = createErrorFromResponse(error.response);
            }).then(() => {
                this.submitting = false;
            })
        }
    };

    isFormValid = () => {
        this.blogManagerErrors.blogRole = validateBlogManagerRole(this.updateBlogManagerFormValues.blogRole);

        return !Boolean(this.blogManagerErrors.blogRole);
    }
}
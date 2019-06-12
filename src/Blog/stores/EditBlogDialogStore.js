import {observable, action, reaction, computed} from 'mobx';
import * as blogValidators from '../validation';
import {blogService, createErrorFromResponse} from "../../Api";
import {Component} from "../../simple-ioc";

const EDIT_BLOG_FORM_VALUES_INITIAL_STATE = {
    name: "",
    description: "",
    avatarUri: "",
    blogManagersVisibilityLevel: "",
    defaultPublisherType: ""
};

const EDIT_BLOG_FORM_ERRORS_INITIAL_STATE = {
    name: undefined,
    description: undefined,
    avatarUri: undefined,
    blogManagersVisibilityLevel: undefined,
    defaultPublisherType: undefined
};

@Component({
    dependencies: [
        {propertyName: 'blogStore'}
    ]
})
class EditBlogDialogStore {
    @observable blogStore = undefined;
    @observable editBlogFormValues = EDIT_BLOG_FORM_VALUES_INITIAL_STATE;
    @observable editBlogFormErrors = EDIT_BLOG_FORM_ERRORS_INITIAL_STATE;
    @observable updatedBlog = undefined;
    @observable fetchingBlog = false;
    @observable submitting = false;
    @observable submissionError = undefined;
    @observable fetchingBlogError = undefined;
    @observable editBlogDialogOpen = false;

    @computed get blogId() {
        return this.blogStore.blogId;
    }

    constructor() {
        reaction(
            () => this.editBlogDialogOpen,
            dialogOpen => {
                if (dialogOpen && this.blogId) {
                    this.fetchBlog();
                }

                if (!dialogOpen) {
                    this.editBlogFormErrors = EDIT_BLOG_FORM_ERRORS_INITIAL_STATE;
                    this.editBlogFormValues = EDIT_BLOG_FORM_ERRORS_INITIAL_STATE;
                    this.updatedBlog = undefined;
                    this.submissionError = undefined;
                }
            }
        );

        reaction(
            () => this.blogId,
            () => {
                this.editBlogFormValues = EDIT_BLOG_FORM_VALUES_INITIAL_STATE;
                this.editBlogFormErrors = EDIT_BLOG_FORM_ERRORS_INITIAL_STATE;
            }
        );

        reaction(
            () => this.editBlogFormValues.name,
            name => this.editBlogFormErrors.name = blogValidators.validateBlogName(name)
        );

        reaction(
            () => this.editBlogFormValues.description,
            description => this.editBlogFormErrors.description = blogValidators.validateBlogDescription(description)
        );

        reaction(
            () => this.editBlogFormValues.avatarUri,
            () => this.validateAvatarUri()
        );

        reaction(
            () => this.editBlogFormValues.blogManagersVisibilityLevel,
            blogManagersVisibilityLevel => this.editBlogFormErrors.blogManagersVisibilityLevel
                = blogValidators.validateBlogManagersVisibilityLevel(blogManagersVisibilityLevel)
        );

        reaction(
            () => this.editBlogFormValues.defaultPublisherType,
            defaultPublisherType => this.editBlogFormErrors.defaultPublisherType
                = blogValidators.validateDefaultPublisherType(defaultPublisherType)
        )
    }

    @action setEditBlogFormDialogOpen = open => {
        this.editBlogDialogOpen = open;
    };

    @action setEditBlogFormValue = (value, propertyName) => {
        this.editBlogFormValues[propertyName] = value;
    };

    @action validateAvatarUri = () => {
        blogValidators.validateBlogAvatarUri(this.editBlogFormValues.avatarUri).then(result => {
            this.editBlogFormErrors.avatarUri = result;
        })
    };

    @action fetchBlog = () => {
        if (this.blogId) {
            this.fetchingBlog = true;
            this.fetchingBlogError = undefined;
            this.submissionError = undefined;

            return blogService.findById(this.blogId)
                .then(response => {
                    this.editBlogFormValues = {
                        name: response.data.name,
                        description: response.data.description,
                        avatarUri: response.data.avatarUri,
                        blogManagersVisibilityLevel: response.data.blogManagersVisibilityLevel,
                        defaultPublisherType: response.data.defaultPublisherType
                    }
                }).catch(error => {
                    this.fetchingBlogError = createErrorFromResponse(error.response);
                }).then(() => {
                    this.fetchingBlog = false;
                })
        }
    };

    updateBlog = () => {
        if (this.isFormValid()) {
            this.submissionError = undefined;
            this.submitting = true;

            return blogService.update(this.blogId, this.editBlogFormValues)
                .then(response => {
                    this.updatedBlog = response.data;
                }).catch(error => {
                    this.submissionError = createErrorFromResponse(error.response);
                }).then(() => {
                    this.submitting = false;
                })
        }
    };

    isFormValid = () => {
        this.editBlogFormErrors.name = blogValidators.validateBlogName(this.editBlogFormValues.name);
        this.editBlogFormErrors.description = blogValidators.validateBlogDescription(this.editBlogFormValues.description);
        this.validateAvatarUri();
        this.editBlogFormErrors.blogManagersVisibilityLevel = blogValidators
            .validateBlogManagersVisibilityLevel(this.editBlogFormValues.blogManagersVisibilityLevel);
        this.editBlogFormErrors.defaultPublisherType = blogValidators
            .validateDefaultPublisherType(this.editBlogFormValues.defaultPublisherType);

        const {name, description, avatarUri, blogManagersVisibilityLevel,
            defaultPublisherType} = this.editBlogFormErrors;

        return !(name, description, avatarUri, blogManagersVisibilityLevel, defaultPublisherType);
    }
}

export default EditBlogDialogStore;
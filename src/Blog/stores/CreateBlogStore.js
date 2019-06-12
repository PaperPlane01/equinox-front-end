import {observable, action, reaction} from 'mobx';
import {validateBlogAvatarUri, validateBlogDescription, validateBlogName} from "../validation";
import Api, {Routes, createErrorFromResponse} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    order: Component.Order.HIGH
})
class CreateBlogStore {
    @observable createBlogFormValues = {
        name: '',
        description: '',
        avatarUri: '',
        defaultPublisherType: 'BLOG',
        blogManagersVisibilityLevel: 'PUBLIC'
    };

    @observable createBlogFormErrors = {
        name: undefined,
        description: undefined,
        avatarUri: undefined
    };

    @observable submissionError = undefined;
    @observable persistedBlog = undefined;
    @observable pending = false;

    constructor() {
        reaction(
            () => this.createBlogFormValues.name,
            () => this.validateName()
        );

        reaction(
            () => this.createBlogFormValues.description,
            () => this.validateDescription()
        );

        reaction(
            () => this.createBlogFormValues.avatarUri,
            () => this.validateAvatarUri()
        );
    }

    @action setCreateBlogFormValue = (value, propertyName) => {
        this.createBlogFormValues[propertyName] = value;
    };

    @action validateName = () => {
        this.createBlogFormErrors.name = validateBlogName(this.createBlogFormValues.name);
    };

    @action validateDescription = () => {
        this.createBlogFormErrors.description = validateBlogDescription(this.createBlogFormValues.description);
    };

    @action validateAvatarUri = () => {
        validateBlogAvatarUri(this.createBlogFormValues.avatarUri).then(result => {
            this.createBlogFormErrors.avatarUri = result;
        })
    };

    @action createBlog = () => {
        if (this.isFormValid()) {
            this.pending = true;
            return Api.post(`/${Routes.BLOGS}`, JSON.stringify(this.createBlogFormValues))
                .then(response => {
                    this.persistedBlog = response.data;
                    this.submissionError = undefined;
                }).catch(error => {
                    this.submissionError = createErrorFromResponse(error.response);
                }).then(() => {
                    this.pending = false;
                })
        }
    };

    isFormValid = () => {
        this.validateName();
        this.validateAvatarUri();
        this.validateDescription();

        return !this.createBlogFormErrors.name && !this.createBlogFormErrors.description
            && !this.createBlogFormErrors.avatarUri;
    }
}

export default CreateBlogStore;
import {observable, action, reaction} from 'mobx';
import {userService, blogManagerService, createErrorFromResponse} from "../../Api";
import {validateBlogManagerRole, validateBlogManagerUser} from "../validation";

export default class CreateBlogManagerStore {
    @observable userId = undefined;
    @observable user = undefined;
    @observable createBlogManagerFormValues = {
        blogRole: "EDITOR"
    };
    @observable createBlogManagerFormErrors = {
        blogRole: undefined,
        user: undefined
    };
    @observable submitting = false;
    @observable submissionError = undefined;
    @observable fetchingUser = false;
    @observable userError = undefined;
    @observable createBlogManagerDialogOpen = false;
    @observable persistedBlogManager = undefined;
    @observable blogId = undefined;

    constructor() {
        reaction(
            () => this.userId,
            () => {
                this.userId && this.fetchUser();
            }
        )
    }

    @action setUserId = id => {
        this.userId = id;
    };

    @action setBlogId = id => {
        this.blogId = id;
    };

    @action setCreateBlogManagerDialogOpen = open => {
        this.createBlogManagerDialogOpen = open;
    };

    @action fetchUser = () => {
        this.userError = undefined;
        this.fetchingUser = true;

        return userService.findById(this.userId)
            .then(response => {
                this.user = response.data;
            }).catch(error => {
                this.userError = createErrorFromResponse(error.response);
            }).then(() => {
                this.fetchingUser = false;
            })
    };

    @action setCreateBlogManagerFormValue = (value, propertyName) => {
        console.log(value);
        console.log(propertyName);
        this.createBlogManagerFormValues[propertyName] = value;
    };

    @action createBlogManager = () => {
        if (this.isFormValid()) {
            this.submissionError = undefined;
            this.submitting = true;

            return blogManagerService.save(this.blogId, this.userId, this.createBlogManagerFormValues.blogRole)
                .then(response => {
                    this.persistedBlogManager = response.data;
                }).catch(error => {
                    this.submissionError = createErrorFromResponse(error.response);
                }).then(() => {
                    this.submitting = false;
                })
        } else {
            console.log('form invalid');
        }
    };

    isFormValid = () => {
        this.createBlogManagerFormErrors.blogRole = validateBlogManagerRole(this.createBlogManagerFormValues.blogRole);
        this.createBlogManagerFormErrors.user = validateBlogManagerUser(this.user);

        const {blogRole, user} = this.createBlogManagerFormErrors;
        console.log(blogRole);
        console.log(user);

        return !Boolean(blogRole || user);
    }
}
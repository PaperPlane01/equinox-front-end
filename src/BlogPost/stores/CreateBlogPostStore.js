import {action, observable, reaction} from 'mobx';
import {convertToRaw, EditorState} from 'draft-js';
import {blogPostService, createErrorFromResponse} from "../../Api";
import {validateBlogPostContent, validateBlogPostTags, validateBlogPostTitle} from "../validation";
import {Component} from "../../simple-ioc";

const CREATE_BLOG_POST_FORM_VALUES_INITIAL_STATE = {
    title: "",
    content: EditorState.createEmpty(),
    tags: []
};
const CREATE_BLOG_POST_FORM_ERRORS_INITIAL_STATE = {
    title: undefined,
    content: undefined,
    tags: undefined
};

@Component({
    order: Component.Order.LOW
})
class CreateBlogPostStore {
    @observable createBlogPostFormValues = CREATE_BLOG_POST_FORM_VALUES_INITIAL_STATE;
    @observable createBlogPostFormErrors = CREATE_BLOG_POST_FORM_ERRORS_INITIAL_STATE;
    @observable submissionError = undefined;
    @observable pending = false;
    @observable blogId = undefined;
    @observable persistedBlogPost = undefined;
    @observable createBlogPostFormOpen = false;

    constructor() {
        reaction(
            () => this.persistedBlogPost,
            blogPost => {
                if (blogPost) {
                    this.createBlogPostFormOpen = false;
                    this.createBlogPostFormValues = CREATE_BLOG_POST_FORM_VALUES_INITIAL_STATE;
                    this.createBlogPostFormErrors = CREATE_BLOG_POST_FORM_ERRORS_INITIAL_STATE;
                }
            }
        )
    }

    @action setBlogId = blogId => {
        this.blogId = blogId;
    };

    @action setCreateBlogPostFormValue = (value, propertyName) => {
        this.createBlogPostFormValues[propertyName] = value;
    };

    @action addTag = tag => {
        this.createBlogPostFormValues.tags = [
            ...this.createBlogPostFormValues.tags,
            tag
        ]
    };

    @action removeTag = tagIndex => {
        this.createBlogPostFormValues.tags = this.createBlogPostFormValues.tags
            .filter((tag, index) => index !== tagIndex);
    };

    @action validateTitle = () => {
        this.createBlogPostFormErrors.title = validateBlogPostTitle(this.createBlogPostFormValues.title);
    };

    @action validateTags = () => {
        this.createBlogPostFormErrors.tags = validateBlogPostTags(this.createBlogPostFormValues.tags);
    };

    @action validateContent = () => {
        this.createBlogPostFormErrors.content = validateBlogPostContent(
            this.createBlogPostFormValues.content.getCurrentContent()
        );
    };

    @action setCreateBlogPostFormOpen = open => {
        this.createBlogPostFormOpen = open;
    };

    @action createBlogPost = () => {
        if (this.isFormValid()) {
            this.pending = true;

            return blogPostService.save({
                ...this.createBlogPostFormValues,
                content: convertToRaw(this.createBlogPostFormValues.content.getCurrentContent()),
                blogId: this.blogId
            }).then(response => {
                this.persistedBlogPost = response.data;
                console.log(this.persistedBlogPost);
            }).catch(error => {
                this.submissionError = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
        }
    };

    isFormValid = () => {
        this.validateTitle();
        this.validateTags();
        this.validateContent();

        return !this.createBlogPostFormErrors.title && !this.createBlogPostFormErrors.tags
            && !this.createBlogPostFormErrors.content;
    }
}

export default CreateBlogPostStore;
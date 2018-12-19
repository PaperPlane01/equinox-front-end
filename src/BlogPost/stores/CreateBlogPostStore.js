import {action, observable} from 'mobx';
import {convertToRaw, EditorState} from 'draft-js';
import {blogPostService, createErrorFromResponse} from "../../Api";
import {validateBlogPostContent, validateBlogPostTags, validateBlogPostTitle} from "../validation";

export default class CreateBlogPostStore {
    @observable createBlogPostFormValues = {
        title: "",
        content: EditorState.createEmpty(),
        tags: []
    };
    @observable createBlogPostFormErrors = {
        title: undefined,
        content: undefined,
        tags: undefined
    };
    @observable submissionError = undefined;
    @observable pending = false;
    @observable blogId = undefined;
    @observable persistedBlogPost = undefined;
    @observable createBlogPostFormHidden = true;

    @action setBlogId = blogId => {
        this.blogId = blogId;
    };

    @action setCreateBlogPostFormValue = (value, propertyName) => {
        this.createBlogPostFormValues[propertyName] = value;
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

    @action setCreateBlogPostFormHidden = hidden => {
        this.createBlogPostFormHidden = hidden;
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
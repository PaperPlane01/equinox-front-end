import {observable, action, reaction} from 'mobx';
import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';
import {validateBlogPostContent, validateBlogPostTags, validateBlogPostTitle} from "../validation";
import {createErrorFromResponse, blogPostService} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    order: Component.Order.LOWEST
})
class UpdateBlogPostStore {
    @observable blogPost = undefined;
    @observable updateBlogPostFormValues = {
        content: EditorState.createEmpty(),
        title: undefined,
        tags: undefined
    };
    @observable blogPostId = undefined;
    @observable fetchingBlogPost = false;
    @observable fetchingError = undefined;
    @observable updateBlogPostFormErrors = {
        title: undefined,
        content: undefined,
        tags: undefined
    };
    @observable submitting = false;
    @observable submissionError = undefined;
    @observable blogPostUpdatedSuccessfully = false;

    constructor() {
        reaction(
            () => this.updateBlogPostFormValues.title,
            title => {
                this.updateBlogPostFormErrors.title = validateBlogPostTitle(title);
            }
        );

        reaction(
            () => this.updateBlogPostFormValues.tags,
            tags => {
                this.updateBlogPostFormErrors.tags = validateBlogPostTags(tags);
            }
        );

        reaction(
            () => this.blogPostId,
            id => {
                this.reset();
                if (id) {
                    this.fetchBlogPost();
                }
            }
        )
    }

    @action setUpdateBlogPostFormValue = (value, propertyName) => {
        this.updateBlogPostFormValues[propertyName] = value;
    };

    @action addTag = tag => {
        this.updateBlogPostFormValues.tags = [
            ...this.updateBlogPostFormValues.tags,
            tag
        ]
    };

    @action removeTag = tagIndex => {
        this.updateBlogPostFormValues.tags = this.updateBlogPostFormValues.tags
            .filter((tag, index) => tagIndex !== index);
    };

    @action setBlogPostId = id => {
        this.blogPostId = id;
    };

    @action fetchBlogPost = () => {
        this.fetchingError = undefined;
        this.fetchingBlogPost = true;

        return blogPostService.findById(this.blogPostId)
            .then(response => {
                this.blogPost = response.data;
                this.updateBlogPostFormValues = {
                    title: response.data.title,
                    content: EditorState.createWithContent(convertFromRaw(response.data.content)),
                    tags: response.data.tags.map(tag => tag.name)
                }
            }).catch(error => {
                this.fetchingError = createErrorFromResponse(error.response);
            }).then(() => {
                this.fetchingBlogPost = false;
            })
    };

    @action reset = () => {
        this.blogPost = undefined;
        this.updateBlogPostFormValues =  {
            content: undefined,
            title: undefined,
            tags: undefined
        };
        this.updateBlogPostFormErrors =  {
            content: undefined,
            title: undefined,
            tags: undefined
        };
        this.fetchingError = undefined;
        this.submissionError = undefined;
        this.blogPostUpdatedSuccessfully = false;
    };

    @action updateBlogPost = () => {
        if (this.isFormValid()) {
            this.submissionError = undefined;
            this.submitting = true;

            return blogPostService.update(this.blogPostId, {
                ...this.updateBlogPostFormValues,
                content: convertToRaw(this.updateBlogPostFormValues.content.getCurrentContent())
            }).then(() => {
                console.log('blog post updated successfully');
                this.blogPostUpdatedSuccessfully = true;
                console.log(this.blogPostUpdatedSuccessfully);
            }).catch(error => {
                this.submissionError = createErrorFromResponse(error.response);
            }).then(() => {
                this.submitting = false;
            })
        }
    };

    @action isFormValid = () => {
        this.updateBlogPostFormErrors.content = validateBlogPostContent(this.updateBlogPostFormValues.content.getCurrentContent());
        this.updateBlogPostFormErrors.tags = validateBlogPostTags(this.updateBlogPostFormValues.tags);
        this.updateBlogPostFormErrors.title = validateBlogPostTitle(this.updateBlogPostFormValues.title);

        const {content, tags, title} = this.updateBlogPostFormErrors;

        return !content && !tags && !title;
    }
}

export default UpdateBlogPostStore;
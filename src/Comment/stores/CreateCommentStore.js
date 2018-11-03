import {action, reaction, observable, computed} from 'mobx';
import {commentService, createErrorFromResponse} from "../../Api";
import {validateContent} from "../validation";

export default class CreateCommentStore {
    @observable content = undefined;
    @observable rootCommentId = undefined;
    @observable referredCommentId = undefined;
    @observable validationError = undefined;
    @observable submissionError = undefined;
    @observable pending = false;
    @observable blogPostStore = undefined;
    @observable persistedComment = undefined;

    @computed get blogPostId() {
        return this.blogPostStore.blogPostId;
    }

    constructor(blogPostStore) {
        this.blogPostStore = blogPostStore;

        reaction(
            () => this.content,
            () => {
                if (!this.persistedComment) {
                    this.validationError = validateContent(this.content);
                }
            }
        )
    }

    @action setRootCommentId = rootCommentId => {
        this.rootCommentId = rootCommentId;
    };

    @action setReferredCommentId = referredCommentId => {
        this.referredCommentId = referredCommentId;
    };

    @action setContent = content => {
        if (this.persistedComment) {
            this.persistedComment = undefined;
        }
        this.content = content;
    };

    @action saveComment = () => {
        if (this.isFormValid()) {
            this.pending = true;
            this.submissionError = undefined;
            this.persistedComment = undefined;

            return commentService.save({
                rootCommentId: this.rootCommentId,
                referredCommentId: this.referredCommentId,
                content: this.content,
                blogPostId: this.blogPostId
            }).then(response => {
                this.persistedComment = response.data;
                this.content = "";
                this.blogPostStore.increaseNumberOfComments();
            }).catch(error => {
                this.submissionError = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
        }
    };

    isFormValid = () => {
        this.validationError = validateContent(this.content);
        return !this.validationError;
    }
}
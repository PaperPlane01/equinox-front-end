import addHours from 'date-fns/addHours';
import {observable, action, computed, reaction} from 'mobx';
import {blogBlockingService, createErrorFromResponse} from "../../../Api";
import {validateEndDate, validateReason} from "../validation";

export default class CreateBlogBlockingStore {
    @observable blogStore = undefined;
    @observable blogPostStore = undefined;
    @observable createBlogBlockingFormValues = {
        endDate: addHours(new Date(), 1),
        reason: ""
    };
    @observable createBlogBlockingFormErrors = {
        endDate: undefined,
        reason: undefined
    };
    @observable blockedUserId = undefined;
    @observable createBlogBlockingDialogOpened = false;
    @observable pending = false;
    @observable submissionError = undefined;
    @observable persistedBlogBlocking = undefined;

    @computed get blogId() {
        return this.blogStore.blogId || (this.blogPostStore.blogPost && this.blogPostStore.blogPost.blogId);
    }

    constructor(blogStore, blogPostStore) {
        this.blogStore = blogStore;
        this.blogPostStore = blogPostStore;
    }

    @action setCreateBlogBlockingFormValue = (value, propertyName) => {
        this.createBlogBlockingFormValues[propertyName] = value;
    };

    @action setCreateBlogBlockingDialogOpened = opened => {
        this.createBlogBlockingDialogOpened = opened;
    };

    @action setBlockedUserId = id => {
        this.blockedUserId = id;
    };

    @action saveBlogBlocking = () => {
        if (this.isFormValid()) {
            this.pending = true;
            this.submissionError = undefined;

            return blogBlockingService.save({
                ...this.createBlogBlockingFormValues,
                blogId: this.blogId,
                blockedUserId: this.blockedUserId
            }).then(response => {
                this.persistedBlogBlocking = response.data;
            }).catch(error => {
                this.submissionError = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            });
        }
    };

    isFormValid = () => {
        this.createBlogBlockingFormErrors.endDate = validateEndDate(this.createBlogBlockingFormValues.endDate);
        this.createBlogBlockingFormErrors.reason = validateReason(this.createBlogBlockingFormValues.reason);

        const {endDate, reason} = this.createBlogBlockingFormErrors;

        return !Boolean(endDate || reason);
    }
}
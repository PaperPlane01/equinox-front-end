import {observable, action, reaction} from 'mobx';
import {validateEndDate, validateReason} from "../validation";
import {blogBlockingService, createErrorFromResponse} from "../../../Api";

export default class UpdateBlogBlockingStore {
    @observable blogBlockingFormValues = {
        endDate: undefined,
        reason: ""
    };
    @observable blogBlockingId = undefined;
    @observable blogBlockingFormErrors = {
        endDate: undefined,
        reason: undefined
    };
    @observable fetchingBlogBlocking = false;
    @observable submittingForm = false;
    @observable fetchingError = undefined;
    @observable submissionError = undefined;
    @observable updatedBlogBlocking = undefined;
    @observable updateBlogBlockingDialogOpen = false;
    @observable blockedUserUsername = "";

    constructor() {
        reaction(
            () => this.blogBlockingId,
            () => {
                if (this.blogBlockingId) {
                    this.fetchBlogBlocking();
                }
            }
        );
    }

    @action setBlogBlockingId = id => {
        this.blogBlockingId = id;
    };

    @action setUpdateBlogBlockingDialogOpen = open => {
        this.updateBlogBlockingDialogOpen = open;
    };

    @action setUpdateBlogBlockingFormValue = (value, propertyName) => {
        this.blogBlockingFormValues[propertyName] = value;
    };

    @action fetchBlogBlocking = () => {
        //this.fetchingBlogBlocking = true;
        this.fetchingError = undefined;

        return blogBlockingService.findById(this.blogBlockingId)
            .then(response => {
                this.blogBlockingFormValues = {
                    ...response.data
                };
                this.blockedUserUsername = response.data.blockedUser.displayedName;
            }).catch(error => {
                this.fetchingError = createErrorFromResponse(error.response);
            }).then(() => {
                this.fetchingBlogBlocking = false;
            })
    };

    @action updateBlogBlogBlockingFormValue = (value, propertyName) => {
        this.blogBlockingFormValues[propertyName] = value;
    };

    @action updateBlogBlocking = () => {
        if (this.isFormValid()) {
            this.submittingForm = true;
            this.submissionError = undefined;

            return blogBlockingService.update(this.blogBlockingId, {
                reason: this.blogBlockingFormValues.reason,
                endDate: this.blogBlockingFormValues.endDate
            }).then(response => {
                this.updatedBlogBlocking = response.data;
            }).catch(error => {
                this.submissionError = createErrorFromResponse(error.response);
            }).then(() => {
                this.submittingForm = false;
            });
        }
    };

    isFormValid = () => {
        this.blogBlockingFormErrors.endDate = validateEndDate(this.blogBlockingFormValues.endDate);
        this.blogBlockingFormErrors.reason = validateReason(this.blogBlockingFormValues.reason);

        const {endDate, reason} = this.blogBlockingFormErrors;

        return !Boolean(endDate || reason);
    }
}
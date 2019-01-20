import {observable, action, reaction} from 'mobx';
import {createErrorFromResponse, blogPostReportService} from "../../Api";
import {validateReportReason, validateReportDescription} from "../../Report";

export default class CreateBlogPostReportStore {
    @observable blogPostId = undefined;
    @observable createBlogPostReportFormValues = {
        reason: '',
        description: ''
    };
    @observable createBlogPostReportFormErrors = {
        reason: undefined,
        description: undefined
    };
    @observable pending = false;
    @observable submissionError = undefined;
    @observable reportBlogPostDialogOpen = false;
    @observable persistedBlogPostReport = undefined;
    @observable shouldShowSnackBar = false;

    constructor() {
        reaction(
            () => this.createBlogPostReportFormValues.reason,
            reason => {
                this.createBlogPostReportFormErrors.reason = validateReportReason(reason);
            }
        );

        reaction(
            () => this.createBlogPostReportFormValues.description,
            description => {
                this.createBlogPostReportFormErrors.description = validateReportDescription(description);
            }
        );

        reaction(
            () => this.persistedBlogPostReport,
            persistedBlogPostReport => {
                this.reportBlogPostDialogOpen = false;
                if (persistedBlogPostReport) {
                    this.shouldShowSnackBar = true;
                }
            }
        );

        reaction(
            () => this.reportBlogPostDialogOpen,
            open => {
                if (!open) {
                    this.persistedBlogPostReport = undefined;
                }
            }
        )
    }

    @action setBlogPostId = id => {
        this.blogPostId = id;
    };

    @action setCreateBlogPostReportFormValue = (value, propertyName) => {
        this.createBlogPostReportFormValues[propertyName] = value;
    };

    @action setReportBlogPostDialogOpen = open => {
        this.reportBlogPostDialogOpen = open;
    };

    @action setShouldShowSnackBar = shouldShowSnackBar => {
        this.shouldShowSnackBar = shouldShowSnackBar;
    };

    @action saveBlogPostReport = () => {
        if (this.isFormValid()) {
            this.pending = true;
            this.submissionError = undefined;

            return blogPostReportService.save({
                blogPostId: this.blogPostId,
                ...this.createBlogPostReportFormValues
            }).then(response => {
                this.persistedBlogPostReport = response.data;
            }).catch(error => {
                this.submissionError = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
        }
    };

    @action isFormValid = () => {
        this.createBlogPostReportFormErrors.reason = validateReportReason(this.createBlogPostReportFormValues.reason);
        this.createBlogPostReportFormErrors.description
            = validateReportDescription(this.createBlogPostReportFormValues.description);

        const {reason, description} = this.createBlogPostReportFormErrors;

        return !(reason || description);
    }
}
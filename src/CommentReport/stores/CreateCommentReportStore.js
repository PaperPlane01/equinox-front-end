import {action, observable, reaction} from 'mobx';
import {createErrorFromResponse, commentReportService} from "../../Api";
import {validateReportReason, validateReportDescription} from "../../Report";

export default class CreateCommentReportStore {
    @observable commentId = undefined;
    @observable createCommentReportFormValues = {
        description: '',
        reason: ''
    };
    @observable createCommentReportFormErrors = {
        description: undefined,
        reason: undefined
    };
    @observable pending = false;
    @observable submissionError = undefined;
    @observable createCommentReportDialogOpen = false;
    @observable persistedCommentReport = undefined;
    @observable shouldShowSnackBar = false;

    constructor() {
        reaction(
            () => this.createCommentReportFormValues.reason,
            reason => {
                this.createCommentReportFormErrors.reason = validateReportReason(reason);
            }
        );

        reaction(
            () => this.createCommentReportFormValues.description,
            description => {
                this.createCommentReportFormErrors.description = validateReportDescription(description);
            }
        );

        reaction(
            () => this.persistedCommentReport,
            () => {
                this.createCommentReportDialogOpen = false;
                if (this.persistedCommentReport) {
                    this.shouldShowSnackBar = true;
                }
            }
        );

        reaction(
            () => this.commentId,
            () => {
                this.createCommentReportFormValues = {
                    reason: undefined,
                    description: ''
                };
                this.createCommentReportFormErrors = {
                    reason: undefined,
                    description: undefined
                };
                this.submissionError = undefined;
                this.persistedCommentReport = undefined;
            }
        )
    }

    @action setShouldShowSnackBar = shouldShowSnackBar => {
        this.shouldShowSnackBar = shouldShowSnackBar;
    };

    @action setCommentId = id => {
        this.commentId = id;
    };

    @action setCreateCommentReportDialogOpen = open => {
        this.createCommentReportDialogOpen = open;
    };

    @action setCreateCommentReportFormValue = (value, propertyName) => {
        this.createCommentReportFormValues[propertyName] = value;
    };

    @action createCommentReport = () => {
        this.pending = true;
        this.submissionError = undefined;

        if (this.isFormValid()) {
            return commentReportService.save({
                commentId: this.commentId,
                ...this.createCommentReportFormValues
            }).then(response => {
                this.persistedCommentReport = response.data;
            }).catch(error => {
                this.submissionError = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
        }
    };

    @action isFormValid = () => {
        this.createCommentReportFormErrors.reason = validateReportReason(this.createCommentReportFormValues.reason);
        this.createCommentReportFormErrors.description = validateReportDescription(this.createCommentReportFormValues.description);

        const {reason, description} = this.createCommentReportFormErrors;

        return !(reason && description);
    }
}
import {action, observable, reaction} from 'mobx';
import {createErrorFromResponse, commentReportService} from "../../Api";
import {validateReportReason, validateReportDescription} from "../../Report";
import {Component} from "../../simple-ioc";

@Component()
class CreateCommentReportStore {
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
                console.log('validating reason');
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
                if (this.persistedCommentReport) {
                    this.createCommentReportDialogOpen = false;
                    this.shouldShowSnackBar = true;
                }
            }
        );

        reaction(
            () => this.createCommentReportDialogOpen,
            open => {
                if (!open) {
                    this.persistedCommentReport = undefined;
                }
            }
        );

        reaction(
            () => this.commentId,
            () => {
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

    @action saveCommentReport = () => {
        if (this.isFormValid()) {
            this.pending = true;
            this.submissionError = undefined;
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

        return !(reason || description);
    }
}

export default CreateCommentReportStore;
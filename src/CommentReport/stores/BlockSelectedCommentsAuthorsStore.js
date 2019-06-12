import {observable, action, computed, reaction} from 'mobx';
import {createErrorFromResponse, globalBlockingService} from "../../Api";
import {validateEndDate, validateReason} from "../../GlobalBlocking/validation";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'commentReportListStore'},
    ],
    order: Component.Order.MEDIUM
})
class BlockSelectedCommentsAuthorsStore {
    @observable commentReportListStore = undefined;
    @observable globalBlockingForm = {
        reason: '',
        endDate: undefined
    };
    @observable globalBlockingFormErrors = {
        reason: undefined,
        endDate: undefined
    };
    @observable globalBlockingDialogOpen = false;
    @observable submissionError = undefined;
    @observable submitting = false;
    @observable showSnackBar = false;
    @observable persistedGlobalBlockings = undefined;

    @computed get userIds() {
        let result = [];
        this.commentReportListStore.normalizedCommentReports.selectedCommentReports.forEach(selectedReportId => {
            const commentAuthorId = this.commentReportListStore.normalizedCommentReports
                .entities
                .commentReports[selectedReportId]
                .comment
                .author
                .id;
            result.push(commentAuthorId);
        });
        return result;
    }

    constructor() {
        reaction(
            () => this.globalBlockingForm.endDate,
            endDate => {
                this.globalBlockingFormErrors.endDate = validateEndDate(endDate);
            }
        );

        reaction(
            () => this.globalBlockingForm.reason,
            reason => {
                this.globalBlockingFormErrors.reason = validateReason(reason);
            }
        );

        reaction(
            () => this.persistedGlobalBlockings,
            globalBlockings => {
                if (globalBlockings && globalBlockings.length !== 0) {
                    this.globalBlockingDialogOpen = false;
                    this.showSnackBar = true;
                }
            }
        );

        reaction(
            () => this.submissionError,
            error => {
                if (error) {
                    this.showSnackBar = true;
                }
            }
        );
    }

    @action setGlobalBlockingFormValue = (value, propertyName) => {
        this.globalBlockingForm[propertyName] = value;
    };

    @action setGlobalBlockingDialogOpen = open => {
        this.globalBlockingDialogOpen = open;
    };

    @action setShowSnackBar = showSnackBar => {
        this.showSnackBar = showSnackBar;
    };

    @action blockSelectedCommentsAuthors = () => {
        if (this.isFormValid()) {
            const globalBlockings = this.userIds.map(userId => ({
                blockedUserId: userId,
                ...this.globalBlockingForm
            }));
            if (globalBlockings.length === 0) return;
            this.submissionError = undefined;
            this.submitting = true;

            return globalBlockingService.saveMultiple(globalBlockings)
                .then(({data}) => {
                    this.persistedGlobalBlockings = data;
                    this.commentReportListStore.markSelectedReportsAsAccepted();
                }).catch(({response}) => {
                    this.submissionError = createErrorFromResponse(response);
                }).then(() => {
                    this.submitting = false;
                })
        }
    };

    @action isFormValid = () => {
        this.globalBlockingFormErrors.reason = validateReason(this.globalBlockingForm.reason);
        this.globalBlockingFormErrors.endDate = validateEndDate(this.globalBlockingForm.endDate);

        const {endDate, reason} = this.globalBlockingFormErrors;

        return !(reason && endDate);
    };
}

export default BlockSelectedCommentsAuthorsStore;
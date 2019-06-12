import {action, computed, observable, reaction} from "mobx";
import {createErrorFromResponse, globalBlockingService} from "../../Api";
import {validateEndDate, validateReason} from "../../GlobalBlocking/validation";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'blogPostReportListStore'}
    ]
})
class BlockSelectedBlogPostsAuthorsStore {
    @observable blogPostReportListStore = undefined;
    @observable globalBlockingForm = {
        reason: '',
        endDate: undefined
    };
    @observable globalBlockingFormErrors = {
        reason: undefined,
        endDate: undefined
    };
    @observable globalBlockingDialogOpen = false;
    @observable submitting = false;
    @observable submissionError = undefined;
    @observable showSnackBar = false;
    @observable persistedGlobalBlockings = undefined;

    @computed
    get userIds() {
        const result = [];
        this.blogPostReportListStore.selectedBlogPostReports.forEach(reportId => {
            result.push(this.blogPostReportListStore.normalizedBlogPostReports.entities.blogPostReports[reportId].blogPost.author.id);
        });
        return result;
    }

    constructor() {
        reaction(
            () => this.globalBlockingForm.reason,
            reason => {
                this.globalBlockingFormErrors.reason = validateReason(reason);
            }
        );

        reaction(
            () => this.globalBlockingForm.endDate,
            endDate => {
                this.globalBlockingFormErrors.endDate = validateEndDate(endDate);
            }
        );
    }

    @action
    setGlobalBlockingFormValue = (value, propertyName) => {
        this.globalBlockingForm[propertyName] = value;
    };

    @action
    setGlobalBlockingDialogOpen = open => {
        this.globalBlockingDialogOpen = open;
    };

    @action
    blockSelectedBlogPostsAuthors = () => {
        if (this.isFormValid()) {
            const globalBlockings = this.userIds.map(blockedUserId => ({
                blockedUserId,
                ...this.globalBlockingForm
            }));
            if (globalBlockings.length === 0) return;
            this.submissionError = undefined;
            this.submitting = true;

            return globalBlockingService.saveMultiple(globalBlockings)
                .then(({data}) => {
                    this.persistedGlobalBlockings = data;
                    this.blogPostReportListStore.markSelectedBlogPostReportsAsAccepted();
                    this.globalBlockingDialogOpen = false;
                    this.showSnackBar = true;
                }).catch(({response}) => {
                    this.submissionError = createErrorFromResponse(response);
                }).then(() => {
                    this.submitting = false;
                })
        }
    };

    @action
    isFormValid = () => {
        this.globalBlockingFormErrors.reason = validateReason(this.globalBlockingForm.reason);
        this.globalBlockingFormErrors.endDate = validateEndDate(this.globalBlockingForm.endDate);

        const {reason, endDate} = this.globalBlockingFormErrors;

        return !(reason && endDate);
    };

    @action
    setShowSnackBar = showSnackBar => {
        this.showSnackBar = showSnackBar;
    };
}

export default BlockSelectedBlogPostsAuthorsStore;
import {action, computed, observable} from 'mobx';
import {commentService, createErrorFromResponse} from "../../Api";

export default class DeleteSelectedReportedCommentsStore {
    @observable pending = false;
    @observable error = undefined;
    @observable showSnackBar = false;
    @observable commentReportListStore = undefined;

    @computed get selectedCommentsId() {
        let result = [];
        this.commentReportListStore.normalizedCommentReports.selectedCommentReports.forEach(reportId => {
            result.push(this.commentReportListStore.normalizedCommentReports.entities.commentReports[reportId].comment.id);
        });
        return result;
    };

    constructor(commentReportListStore) {
        this.commentReportListStore = commentReportListStore;
    };

    @action deleteComments = () => {
        this.error = undefined;
        this.pending = true;

        return commentService.deleteMultiple(this.selectedCommentsId)
            .then(() => {
                this.showSnackBar = true;
                this.commentReportListStore.markSelectedReportsAsAccepted();
            }).catch(({response}) => {
                this.showSnackBar = true;
                this.error = createErrorFromResponse(response);
            }).then(() => {
                this.pending = false;
            })
    };

    @action setShowSnackBar = showSnackBar => {
        this.showSnackBar = showSnackBar;
    };
}
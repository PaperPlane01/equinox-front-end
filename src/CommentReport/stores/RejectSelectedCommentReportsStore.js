import {observable, action, reaction, computed} from 'mobx';
import {createErrorFromResponse, commentReportService} from "../../Api";
import {ReportStatus} from "../../Report";
import {normalize} from "normalizr";
import {commentReportListSchema} from "./schemas";

export default class RejectSelectedCommentReportsStore {
    @observable persistedCommentReports = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable showSnackBar = false;
    @observable commentReportListStore = undefined;

    @computed get selectedReportsIds() {
        return this.commentReportListStore.normalizedCommentReports.selectedCommentReports;
    }

    constructor(commentReportListStore) {
        this.commentReportListStore = commentReportListStore;

        reaction(
            () => this.persistedCommentReports,
            reports => {
                if (reports) {
                    this.showSnackBar = true;
                }
            }
        );

        reaction(
            () => this.error,
            error => {
                if (error) {
                    this.showSnackBar = true;
                }
            }
        )
    }

    @action rejectCommentReports = () => {
        this.pending = true;
        this.error = undefined;

        const commentReports = this.selectedReportsIds.map(id => ({
            id,
            status: ReportStatus.DECLINED
        }));

        return commentReportService.updateMultiple(commentReports)
            .then(({data}) => {
                this.persistedCommentReports = data;
                const normalizedResponse = normalize(data, commentReportListSchema);
                this.commentReportListStore.updateCommentReports(normalizedResponse.entities.commentReports);
                this.commentReportListStore.clearSelection();
            }).catch(({response}) => {
                this.error = createErrorFromResponse(response);
            }).then(() => {
                this.pending = undefined;
            })
    };

    @action setShowSnackBar = showShackBar => {
        this.showSnackBar = showShackBar;
    }
}
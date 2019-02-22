import {action, computed, observable, reaction} from 'mobx';
import {normalize} from 'normalizr';
import {commentReportListSchema} from "./schemas";
import {commentReportService, createErrorFromResponse} from "../../Api";
import {ReportStatus} from "../../Report";
import {canSeeCommentReports} from "../permissions";

const COMMENT_REPORTS_INITIAL_STATE = {
    result: [],
    selectedCommentReports: [],
    entities: {
        commentReports: {}
    }
};

export default class CommentReportListStore {
    @observable authStore = undefined;
    @observable normalizedCommentReports = COMMENT_REPORTS_INITIAL_STATE;
    @observable paginationParameters = {
        pageSize: 30,
        sortingDirection: 'DESC'
    };
    @observable currentPageNumber = 0;
    @observable pending = false;
    @observable error = undefined;
    @observable fetchReportsOnUserChange = false;

    @computed get currentUser() {
        return this.authStore.currentUser;
    }

    constructor(authStore) {
        this.authStore = authStore;

        reaction(
            () => this.currentUser,
            () => {
                if (this.fetchReportsOnUserChange) {
                    this.fetchCommentReports();
                }
            }
        )
    }

    @action fetchCommentReports = () => {
        if (canSeeCommentReports(this.currentUser)) {
            this.error = undefined;
            this.pending = true;

            return commentReportService.findAll({
                ...this.paginationParameters,
                page: this.currentPageNumber
            }).then(({data}) => {
                if (data.length !== 0) {
                    const normalizedResponse = normalize(data, commentReportListSchema);
                    this.normalizedCommentReports.entities.commentReports = {
                        ...this.normalizedCommentReports.entities.commentReports,
                        ...normalizedResponse.entities.commentReports
                    };
                    this.normalizedCommentReports.result = [
                        ...this.normalizedCommentReports.result,
                        ...normalizedResponse.result
                    ];
                    this.currentPageNumber = this.currentPageNumber + 1;
                }
            }).catch(({response}) => {
                this.error = createErrorFromResponse(response);
            }).then(() => {
                this.pending = false;
            })
        }
    };

    @action reset = () => {
        this.normalizedCommentReports = COMMENT_REPORTS_INITIAL_STATE;
        this.currentPageNumber = 0;
    };

    @action setFetchReportsOnUserChange = fetchReportsOnUserChange => {
        this.fetchReportsOnUserChange = fetchReportsOnUserChange;
    };

    @action selectCommentReport = reportId => {
        if (this.normalizedCommentReports.selectedCommentReports.length < 30) {
            this.normalizedCommentReports.entities.commentReports[reportId].selected = true;
            this.normalizedCommentReports.selectedCommentReports.push(reportId);
        }
    };

    @action unselectCommentReport = reportId => {
        this.normalizedCommentReports.entities.commentReports[reportId].selected = false;
        this.normalizedCommentReports.selectedCommentReports = this.normalizedCommentReports.selectedCommentReports
            .filter(selectedReportId => selectedReportId !== reportId);
    };

    @action setCommentReportSelected = (reportId, selected) => {
        if (selected) {
            this.selectCommentReport(reportId);
        } else {
            this.unselectCommentReport(reportId);
        }
    };

    @action clearSelection = () => {
        this.normalizedCommentReports.selectedCommentReports.forEach(reportId => {
            this.normalizedCommentReports.entities.commentReports[reportId].selected = false;
        });
        this.normalizedCommentReports.selectedCommentReports = [];
    };

    @action markSelectedReportsAsAccepted = () => {
        const commentReports = this.normalizedCommentReports.selectedCommentReports.map(id => ({
            id,
            status: ReportStatus.ACCEPTED
        }));

        return commentReportService.updateMultiple(commentReports)
            .then(({data}) => {
                const normalizedResponse = normalize(data, commentReportListSchema);
                normalizedResponse.result.forEach(reportId => {
                    normalizedResponse.entities.commentReports[reportId].selected = true;
                });
                this.normalizedCommentReports.entities.commentReports = {
                    ...this.normalizedCommentReports.entities.commentReports,
                    ...normalizedResponse.entities.commentReports
                }
            })
    };

    @action updateCommentReports = updatedCommentReports => {
        this.normalizedCommentReports.entities.commentReports = {
            ...this.normalizedCommentReports.entities.commentReports,
            ...updatedCommentReports
        };
    }
}
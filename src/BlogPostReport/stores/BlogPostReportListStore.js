import {observable, action, reaction, computed} from "mobx";
import {normalize} from "normalizr";
import {blogPostReportListSchema} from "./schemas";
import {canSeeBlogPostReports} from "../permissions";
import {ReportStatus} from "../../Report";
import {blogPostReportService, createErrorFromResponse} from "../../Api";
import {toJS} from "mobx";

const BLOG_POST_REPORTS_INITIAL_STATE = {
    result: [],
    entities: {
        blogPostReports: {}
    }
};

export default class BlogPostReportListStore {
    @observable authStore = undefined;
    @observable normalizedBlogPostReports = BLOG_POST_REPORTS_INITIAL_STATE;
    @observable selectedBlogPostReports = [];
    @observable paginationParameters = {
        pageSize: 30,
        sortingDirection: 'DESC'
    };
    @observable currentPageNumber = 0;
    @observable pending = false;
    @observable error = undefined;
    @observable fetchReportsOnUserChange = false;

    @computed
    get currentUser() {
        return this.authStore.currentUser;
    }

    constructor(authStore) {
        this.authStore = authStore;

        reaction(
            () => this.currentUser,
            () => {
                if (this.fetchReportsOnUserChange) {
                    this.fetchBlogPostReports();
                }
            }
        )
    }

    @action
    setFetchReportsOnUserChange = fetchReportsOnUserChange => {
        this.fetchReportsOnUserChange = fetchReportsOnUserChange;
    };

    @action
    fetchBlogPostReports = () => {
        if (canSeeBlogPostReports(this.currentUser)) {
            this.error = undefined;
            this.pending = true;

            return blogPostReportService.findAll({
                ...this.paginationParameters,
                page: this.currentPageNumber
            }).then(({data}) => {
                if (data.length !== 0) {
                    const normalizedResponse = normalize(data, blogPostReportListSchema);
                    this.normalizedBlogPostReports.entities.blogPostReports = {
                        ...this.normalizedBlogPostReports.entities.blogPostReports,
                        ...normalizedResponse.entities.blogPostReports
                    };
                    this.normalizedBlogPostReports.result = [
                        ...this.normalizedBlogPostReports.result,
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

    @action
    reset = () => {
        this.normalizedBlogPostReports = BLOG_POST_REPORTS_INITIAL_STATE;
        this.selectedBlogPostReports = [];
        this.error = undefined;
        this.pending = false;
        this.currentPageNumber = 0;
    };

    @action
    selectBlogPostReport = id => {
        if (this.selectedBlogPostReports.length < 30) {
            this.normalizedBlogPostReports.entities.blogPostReports[id].selected = true;
            this.selectedBlogPostReports.push(id);
        }
    };

    @action
    unselectBlogPostReport = id => {
        this.normalizedBlogPostReports.entities.blogPostReports[id].selected = false;
        this.selectedBlogPostReports = this.selectedBlogPostReports.filter(blogPostReportId => blogPostReportId !== id);
    };

    @action
    setBlogPostReportSelected = (id, selected) => {
        if (selected) {
            this.selectBlogPostReport(id);
        } else {
            this.unselectBlogPostReport(id);
        }
    };

    @action
    clearSelection = () => {
        this.selectedBlogPostReports.forEach(blogPostReportId => {
            this.normalizedBlogPostReports.entities.blogPostReports[blogPostReportId].selected = false;
        });
        this.selectedBlogPostReports = [];
    };

    @action
    markSelectedBlogPostReportsAsAccepted = () => {
        const blogPostReports = this.selectedBlogPostReports.map(id => ({
            id,
            status: ReportStatus.ACCEPTED
        }));

        return blogPostReportService.updateMultiple(blogPostReports)
            .then(({data}) => {
                const normalizedResponse = normalize(data, blogPostReportListSchema);
                normalizedResponse.result.forEach(reportId => {
                    normalizedResponse.entities.commentReports[reportId].selected = true;
                });
                this.normalizedBlogPostReports.entities.blogPostReports = {
                    ...this.normalizedBlogPostReports.entities.blogPostReports,
                    ...normalizedResponse.entities.blogPostReports
                }
            })
    };

    @action
    updateBlogPostReports = updatedReports => {
        this.normalizedBlogPostReports.entities.blogPostReports = {
            ...this.normalizedBlogPostReports.entities.blogPostReports,
            ...updatedReports
        }
    };
}
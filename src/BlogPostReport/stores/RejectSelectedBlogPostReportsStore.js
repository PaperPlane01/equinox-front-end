import {observable, action, reaction, computed} from "mobx";
import {normalize} from "normalizr";
import {blogPostReportListSchema} from "./schemas";
import {createErrorFromResponse, blogPostReportService} from "../../Api";
import {ReportStatus} from "../../Report";

export default class RejectSelectedBlogPostReportsStore {
    @observable blogPostReportListStore = undefined;
    @observable persistedBlogPostReports = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable showSnackBar = false;

    @computed
    get selectedReportsIds() {
        return this.blogPostReportListStore.selectedBlogPostReports;
    }

    constructor(blogPostReportListStore) {
        this.blogPostReportListStore = blogPostReportListStore;

        reaction(
            () => this.persistedBlogPostReports,
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
        );
    }

    @action
    rejectBlogPostReports = () => {
        this.pending = true;
        this.error = undefined;

        const blogPostReports = this.selectedReportsIds.map(id => ({
            id,
            status: ReportStatus.DECLINED
        }));

        return blogPostReportService.updateMultiple(blogPostReports)
            .then(({data}) => {
                this.persistedBlogPostReports = data;
                const normalizedResponse = normalize(data, blogPostReportListSchema);
                this.blogPostReportListStore.updateBlogPostReports(normalizedResponse.entities.blogPostReports);
                this.blogPostReportListStore.clearSelection();
            }).catch(({response}) => {
                this.error = createErrorFromResponse(response);
            }).then(() => {
                this.pending = false;
            })
    };

    @action
    setShowShackBar = showShackBar => {
        this.showSnackBar = showShackBar;
    }
}

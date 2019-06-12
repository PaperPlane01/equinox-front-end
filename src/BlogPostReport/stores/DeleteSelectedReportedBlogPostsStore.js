import {action, computed, observable, toJS} from "mobx";
import {blogPostService, createErrorFromResponse} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'blogPostReportListStore'}
    ]
})
class DeleteSelectedReportedBlogPostsStore {
    @observable blogPostReportListStore = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable showSnackBar = false;

    @computed
    get selectedBlogPostsIds() {
        const result = [];
        this.blogPostReportListStore.selectedBlogPostReports.forEach(reportId => {
            result.push(this.blogPostReportListStore.normalizedBlogPostReports.entities.blogPostReports[reportId].blogPost.id);
        });
        return result;
    }

    @action
    deleteBlogPosts = () => {
        this.pending = true;
        this.error = undefined;
        console.log(toJS(this.selectedBlogPostsIds));

        return blogPostService.deleteMultiple(this.selectedBlogPostsIds)
            .then(() => {
                this.showSnackBar = true;
                this.blogPostReportListStore.markSelectedBlogPostReportsAsAccepted();
            }).catch(({response}) => {
                this.error = createErrorFromResponse(response);
                this.showSnackBar = true;
            }).then(() => {
                this.pending = false;
            })
    };

    @action
    setShowSnackBar = showSnackBar => {
        this.showSnackBar = showSnackBar;
    };
}

export default DeleteSelectedReportedBlogPostsStore;
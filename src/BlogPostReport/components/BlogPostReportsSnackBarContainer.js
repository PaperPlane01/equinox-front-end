import React from 'react';
import {observer} from "mobx-react";
import {snackBarHelper} from "../../snack-bar-helper";

@snackBarHelper({
    storeName: 'deleteSelectedReportedBlogPostsStore',
    successLabel: 'blogPostsDeleted',
    errorLabel: 'errorWhenAttemptedToDeleteBlogPosts'
})
@snackBarHelper({
    storeName: 'blockSelectedBlogPostsAuthorsStore',
    successLabel: 'selectedBlogPostsAuthorsBlocked',
    errorLabel: 'errorWhenAttemptedToBlockSelectedBlogPostsAuthors',
    errorPropertyName: 'submissionError'
})
@snackBarHelper({
    storeName: 'rejectSelectedBlogPostReportsStore',
    successLabel: 'reportsRejected',
    errorLabel: 'errorWhenAttemptedToRejectReports'
})
@observer
class BlogPostReportsSnackBarContainer extends React.Component {
    render() {
        return <div id="blogPostReportsSnackBarHelper" style={{display: 'none'}}/>
    }
}

export default BlogPostReportsSnackBarContainer;
import React from 'react';
import {observer} from 'mobx-react';
import {snackBarHelper} from "../../snack-bar-helper";

@snackBarHelper({
    storeName: 'deleteSelectedReportedCommentsStore',
    successLabel: 'commentsDeleted',
    errorLabel: 'errorWhenAttemptedToDeleteComments'
})
@snackBarHelper({
    storeName: 'blockSelectedCommentsAuthorsStore',
    successLabel: 'selectedCommentsAuthorsBlocked',
    errorLabel: 'errorWhenAttemptedToBlockSelectedCommentsAuthors',
    errorPropertyName: 'submissionError'
})
@snackBarHelper({
    storeName: 'rejectSelectedCommentReportsStore',
    successLabel: 'reportsRejected',
    errorLabel: 'errorWhenAttemptedToRejectReports'
})
@observer
class CommentReportsSnackBarContainer extends React.Component {
    render() {
        return <div id="commentReportsSnackBarHelper" style={{display: 'none'}}/>
    }
}

export default CommentReportsSnackBarContainer;
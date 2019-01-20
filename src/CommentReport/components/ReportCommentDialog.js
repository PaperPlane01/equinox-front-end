import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {withSnackbar} from 'notistack';
import CommentReportReasonSelect from './CommentReportReasonSelect';
import {withLocale} from "../../localization";

@withSnackbar
@withLocale
@inject('createCommentReportStore')
@observer
class ReportCommentDialog extends React.Component {
    renderContent = () => {
        const {createCommentReportStore, l} = this.props;
        const {createCommentReportFormValues, createCommentReportFormErrors} = createCommentReportStore;

        return <div>
            <CommentReportReasonSelect/>
            <TextField label={l('description')}
                       value={createCommentReportFormValues.description}
                       fullWidth
                       multiline
                       error={Boolean(createCommentReportFormErrors.description)}
                       helperText={createCommentReportFormErrors.description && l(createCommentReportFormErrors.description)}
                       margin="dense"
                       onChange={event => createCommentReportStore.setCreateCommentReportFormValue(event.target.value, 'description')}
            />
        </div>
    };

    render() {
        const {commentId, createCommentReportStore, l, enqueueSnackbar, fullScreen} = this.props;
        const {pending, submissionError, persistedCommentReport, createCommentReportDialogOpen,
            shouldShowSnackBar} = createCommentReportStore;

        if (commentId === createCommentReportStore.commentId) {
            if (shouldShowSnackBar) {
                enqueueSnackbar(l('commentReportedSuccessfully'));
                createCommentReportStore.setShouldShowSnackBar(false);
            }

            return <Dialog open={createCommentReportDialogOpen && !persistedCommentReport}
                           fullScreen={fullScreen}
                           onClose={() => createCommentReportDialogOpen.setCreateCommentReportDialogOpen(false)}
            >
                <DialogTitle>
                    {l('reportComment')}
                </DialogTitle>
                <DialogContent>
                    {this.renderContent()}
                </DialogContent>
                <DialogActions>
                    {pending && <CircularProgress size={25} color="primary"/>}
                    {submissionError && <Typography variant="body1"
                                                    style={{color: 'red'}}
                    >
                        {l('errorWhenAttemptedToReportComment', {errorStatus: submissionError.status})}
                    </Typography>}
                    <Button variant="contained"
                            color="primary"
                            onClick={createCommentReportStore.saveCommentReport}
                    >
                        {l('report')}
                    </Button>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => createCommentReportStore.setCreateCommentReportDialogOpen(false)}
                    >
                        {l('cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        } else return null;
    }
}

ReportCommentDialog.propTypes = {
    commentId: PropTypes.number,
    createCommentReportStore: PropTypes.object,
    l: PropTypes.func,
    enqueueSnackbar: PropTypes.func,
    fullScreen: PropTypes.bool
};

export default withMobileDialog()(ReportCommentDialog);
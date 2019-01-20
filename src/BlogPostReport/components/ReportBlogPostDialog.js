import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {withSnackbar} from 'notistack';
import BlogPostReportReasonSelect from './BlogPostReportReasonSelect';
import {withLocale} from "../../localization";

@withSnackbar
@withLocale
@inject('createBlogPostReportStore')
@observer
class ReportBlogPostDialog extends React.Component {
    renderContent = () => {
        const {createBlogPostReportStore, l} = this.props;
        const {createBlogPostReportFormValues, createBlogPostReportFormErrors} = createBlogPostReportStore;

        return <div>
            <BlogPostReportReasonSelect/>
            <TextField label={l('description')}
                       value={createBlogPostReportFormValues.description}
                       fullWidth
                       multiline
                       error={Boolean(createBlogPostReportFormErrors.description)}
                       helperText={createBlogPostReportFormErrors.description && l(createBlogPostReportFormErrors.description)}
                       margin="dense"
                       onChange={event => createBlogPostReportStore.setCreateBlogPostReportFormValue(event.target.value, 'description')}
            />
        </div>
    };

    render() {
        const {l, fullScreen, createBlogPostReportStore, blogPostId, enqueueSnackbar} = this.props;
        const {submissionError, pending, persistedBlogPostReport, reportBlogPostDialogOpen,
            shouldShowSnackBar} = createBlogPostReportStore;

        if (blogPostId === createBlogPostReportStore.blogPostId) {
            if (shouldShowSnackBar) {
                enqueueSnackbar(l('blogPostReportedSuccessfully'));
                createBlogPostReportStore.setShouldShowSnackBar(false);
            }

            return <Dialog open={reportBlogPostDialogOpen && !persistedBlogPostReport}
                           fullScreen={fullScreen}
                           onClose={() => createBlogPostReportStore.setReportBlogPostDialogOpen(false)}
            >
                <DialogTitle>
                    {l('reportBlogPost')}
                </DialogTitle>
                <DialogContent>
                    {this.renderContent()}
                </DialogContent>
                <DialogActions>
                    {pending && <CircularProgress size={25} color="primary"/>}
                    {submissionError && <Typography variant="body1"
                                                    style={{color: 'red'}}
                    >
                        {l('errorWhenAttemptedToReportBlogPost', {errorStatus: submissionError.status})}
                    </Typography>}
                    <Button variant="contained"
                            color="primary"
                            onClick={createBlogPostReportStore.saveBlogPostReport}
                    >
                        {l('report')}
                    </Button>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => createBlogPostReportStore.setReportBlogPostDialogOpen(false)}
                    >
                        {l('cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        } else return null;
    }
}

ReportBlogPostDialog.propTypes = {
    blogPostId: PropTypes.number,
    createBlogPostReportStore: PropTypes.object,
    l: PropTypes.func,
    fullScreen: PropTypes.bool,
    enqueueSnackbar: PropTypes.func
};

export default withMobileDialog()(ReportBlogPostDialog);
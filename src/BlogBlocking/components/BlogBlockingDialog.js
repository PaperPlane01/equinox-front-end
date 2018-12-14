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
import {DateTimePicker} from 'material-ui-pickers';
import {withLocale} from "../../localization";

@withLocale
@inject('createBlogBlockingStore')
@observer
class BlogBlockingDialog extends React.Component {
    render() {
        const {createBlogBlockingStore, l, fullScreen, blogId} = this.props;
        const {createBlogBlockingFormValues, createBlogBlockingFormErrors, pending, submissionError,
            persistedBlogBlocking, createBlogBlockingDialogOpened} = createBlogBlockingStore;

        return <Dialog open={createBlogBlockingDialogOpened}
                       onClose={() => createBlogBlockingStore.setCreateBlogBlockingDialogOpened(false)}
                       fullScreen={fullScreen}
        >
            <DialogTitle>
                {l('blockUserInBlog')}
            </DialogTitle>
            <DialogContent>
                <TextField label={l('blockingReason')}
                           value={createBlogBlockingFormValues.reason}
                           onChange={event =>
                               createBlogBlockingStore.setCreateBlogBlockingFormValue(event.target.value, 'reason')}
                           error={Boolean(createBlogBlockingFormErrors.reason)}
                           helperText={createBlogBlockingFormErrors.reason && l(createBlogBlockingFormErrors.reason)}
                           fullWidth
                           margin="dense"
                />
                <DateTimePicker label={l('blockingEndDate')}
                                value={createBlogBlockingFormValues.endDate}
                                onChange={date => createBlogBlockingStore.setCreateBlogBlockingFormValue(date, 'endDate')}
                                disablePast
                                cancelLabel={l('cancel')}
                                openToYearSelection
                                fullWidth
                                format="dd-MM-YYYY hh:mm:ss"
                                clearable
                                clearLabel={l('clear')}
                />
            </DialogContent>
            <DialogActions>
                {pending && <CircularProgress size={15} color="primary"/>}
                {persistedBlogBlocking && <Typography variant="body1" style={{color: 'green'}}>
                    {l('userBlockedSuccessfully')}
                </Typography>}
                {submissionError && <Typography variant="body1" style={{color: 'red'}}>
                    {l('errorWhenAttemptedToBlockUserInBlog', {errorStatus: submissionError.status})}
                </Typography>}
                <Button variant="contained"
                        color="primary"
                        onClick={() => createBlogBlockingStore.saveBlogBlocking(blogId)}
                >
                    {l('block')}
                </Button>
                <Button variant="outlined"
                        color="primary"
                        onClick={() => createBlogBlockingStore.setCreateBlogBlockingDialogOpened(false)}
                >
                    {persistedBlogBlocking
                        ? l('close')
                        : l('cancel')
                    }
                </Button>
            </DialogActions>
        </Dialog>
    }
}

BlogBlockingDialog.propTypes = {
    createBlogBlockingStore: PropTypes.object,
    l: PropTypes.func,
    blogId: PropTypes.func,
    fullScreen: PropTypes.bool
};

export default withMobileDialog()(BlogBlockingDialog);
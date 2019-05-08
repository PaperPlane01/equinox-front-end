import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {DateTimePicker} from 'material-ui-pickers';
import {withLocale} from "../../localization";

@withLocale
@inject('updateBlogBlockingStore')
@observer
class UpdateBlogBlockingDialog extends React.Component {
    renderContent = () => {
        const {updateBlogBlockingStore, l} = this.props;
        const {blogBlockingFormValues, blogBlockingFormErrors, fetchingBlogBlocking,
            fetchingError} = updateBlogBlockingStore;

        if (fetchingBlogBlocking) {
            return <CircularProgress color="primary"
                                     size={100}
                                     style={{
                                         marginLeft: 'calc(50% - 50px)',
                                     }}
            />
        }

        if (fetchingError) {
            return fetchingError.status === 404 || fetchingError.status === 400
                ? <Typography variant="subheading">{l('blogBlockingNotFound')}</Typography>
                : <Typography variant="subheading">
                    {l('errorWhenAttemptedToFetchBlogBlocking', {errorStatus: fetchingError.status})}
                 </Typography>
        }

        return <React.Fragment>
            <TextField value={blogBlockingFormValues.reason}
                       label={l('reason')}
                       onChange={event =>
                           updateBlogBlockingStore.setUpdateBlogBlockingFormValue(event.target.value, 'reason')}
                       margin="dense"
                       fullWidth
                       error={Boolean(blogBlockingFormErrors.reason)}
                       helperText={blogBlockingFormErrors.reason && l(blogBlockingFormErrors.reason)}
            />
            <DateTimePicker label={l('blockingEndDate')}
                            value={blogBlockingFormValues.endDate}
                            onChange={date =>
                                updateBlogBlockingStore.setUpdateBlogBlockingFormValue(date, 'endDate')}
                            disablePast
                            cancelLabel={l('cancel')}
                            openToYearSelection
                            fullWidth
                            format="DD-MM-YYYY HH:mm:ss"
                            ampm={false}
                            clearable
                            clearLabel={l('clear')}
            />
        </React.Fragment>
    };

    render() {
        const {fullScreen, updateBlogBlockingStore, l} = this.props;
        const {submittingForm, submissionError, updatedBlogBlocking,
            updateBlogBlockingDialogOpen, blockedUserUsername} = updateBlogBlockingStore;

        return <Dialog open={updateBlogBlockingDialogOpen}
                       fullScreen={fullScreen}
                       onClose={() => updateBlogBlockingStore.setUpdateBlogBlockingDialogOpen(false)}
        >
            <DialogTitle>
                {l('updateBlogBlocking_withUsernameSpecified', {username: blockedUserUsername})}
            </DialogTitle>
            <DialogContent>
                {this.renderContent()}
            </DialogContent>
            <DialogActions>
                {submittingForm && <CircularProgress size={15} color="primary"/>}
                {submissionError && <Typography variant="body1"
                                                style={{color: 'red'}}
                >
                    {l('errorWhenAttemptedToUpdateBlogBlocking', {errorStatus: submissionError.status})}
                </Typography>}
                {updatedBlogBlocking && <Typography variant="body1"
                                                    style={{color: 'green'}}
                >
                    {l('blogBlockingUpdated')}
                </Typography>}
                <Button variant="contained"
                        color="primary"
                        onClick={updateBlogBlockingStore.updateBlogBlocking}
                >
                    {l('update')}
                </Button>
                <Button variant="outlined"
                        color="secondary"
                        onClick={() => updateBlogBlockingStore.setUpdateBlogBlockingDialogOpen(false)}
                >
                    {updatedBlogBlocking ? l('close') : l('cancel')}
                </Button>
            </DialogActions>
        </Dialog>

    }
}

UpdateBlogBlockingDialog.propTypes = {
    fullScreen: PropTypes.bool,
    updateBlogBlockingStore: PropTypes.object,
    l: PropTypes.func
};

export default withMobileDialog()(UpdateBlogBlockingDialog);
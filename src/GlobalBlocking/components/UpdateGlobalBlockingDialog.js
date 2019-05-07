import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {DateTimePicker} from 'material-ui-pickers';
import {withLocale} from "../../localization";

@withLocale
@inject('updateGlobalBlockingStore')
@observer
class UpdateGlobalBlockingDialog extends React.Component {
    renderContent = () => {
        const {updateGlobalBlockingStore, l} = this.props;
        const {fetchingGlobalBlocking, fetchingGlobalBlockingError, updateGlobalBlockingFormValues,
            updateGlobalBlockingFormErrors} = updateGlobalBlockingStore;

        if (fetchingGlobalBlocking) {
            return  <CircularProgress color="primary"
                                      size={100}
                                      style={{
                                          marginLeft: 'calc(50% - 50px)',
                                      }}
            />
        }

        if (fetchingGlobalBlockingError) {
            return <Typography variant="body1">
                {l('errorWhenAttemptedToFetchGlobalBlocking', {errorStatus: fetchingGlobalBlockingError.status})}
            </Typography>
        }

        return <React.Fragment>
            <TextField label={l('blockingReason')}
                       value={updateGlobalBlockingFormValues.reason}
                       error={Boolean(updateGlobalBlockingFormErrors.reason)}
                       helperText={updateGlobalBlockingFormErrors.reason && l(updateGlobalBlockingFormErrors.reason)}
                       onChange={event => updateGlobalBlockingStore.setUpdateBlogBlockingFormValue(event.target.value, 'reason')}
                       fullWidth
                       margin="dense"
            />
            <DateTimePicker label={l('blockingEndDate')}
                            value={updateGlobalBlockingFormValues.endDate}
                            onChange={date => updateGlobalBlockingStore.setUpdateGlobalBlockingFormValue(date, 'endDate')}
                            autoOk
                            disablePast
                            cancelLabel={l('cancel')}
                            openToYearSelection
                            fullWidth
                            format="DD-MM-YYYY hh:mm:ss"
                            clearable
                            clearLabel={l('clear')}
                            minDateMessage={l('dateShouldNotBeBeforeMinimalDate')}
            />
        </React.Fragment>
    };

    render() {
        const {updateGlobalBlockingStore, l, fullScreen, globalBlockingId} = this.props;
        const {globalBlocking, persistedGlobalBlocking, updateGlobalBlockingDialogOpen, submitting,
            submissionError} = updateGlobalBlockingStore;

        return <Dialog fullScreen={fullScreen}
                       open={updateGlobalBlockingDialogOpen && globalBlockingId === updateGlobalBlockingStore.globalBlockingId}
                       onClose={() => updateGlobalBlockingStore.setUpdateGlobalBlockingDialogOpen(false)}
        >
            <DialogTitle>
                {globalBlocking
                    ? l('updateGlobalBlocking_withUsername', {username: globalBlocking.blockedUser.displayedName})
                    : l('updateGlobalBlocking')
                }
            </DialogTitle>
            <DialogContent>
                {this.renderContent()}
            </DialogContent>
            <DialogActions>
                {submitting && <CircularProgress color="primary" size={15}/>}
                {submissionError && <Typography variant="body1"
                                                style={{color: 'red'}}
                >
                    {l('errorWhenAttemptedToUpdateGlobalBlocking', {errorStatus: submissionError.status})}
                </Typography>}
                {persistedGlobalBlocking && <Typography variant="body1"
                                                        style={{color: 'green'}}
                >
                    {l('globalBlockingUpdatedSuccessfully')}
                </Typography>}
                <Button color="primary"
                        variant="contained"
                        onClick={updateGlobalBlockingStore.updateGlobalBlocking}
                >
                    {l('save')}
                </Button>
                <Button color="secondary"
                        variant="outlined"
                        onClick={() => updateGlobalBlockingStore.setUpdateGlobalBlockingDialogOpen(false)}
                >
                    {persistedGlobalBlocking ? l('close') : l('cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    }
}

UpdateGlobalBlockingDialog.propTypes = {
    updateGlobalBlockingStore: PropTypes.object,
    fullScreen: PropTypes.bool,
    globalBlockingId: PropTypes.number,
    l: PropTypes.func
};

export default withMobileDialog()(UpdateGlobalBlockingDialog);

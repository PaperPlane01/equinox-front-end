import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {DateTimePicker} from 'material-ui-pickers';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {withLocale} from "../../localization";

@withLocale
@inject('createGlobalBlockingStore')
@observer
class CreateGlobalBlockingDialog extends React.Component {
    render() {
        const {createGlobalBlockingStore, l, fullScreen} = this.props;
        const {globalBlockingDialogOpened, globalBlockingFormErrors, submissionError, pending,
            persistedGlobalBlocking, fetchingUser, blockedUser} = createGlobalBlockingStore;

        return <Dialog open={globalBlockingDialogOpened}
                       fullScreen={fullScreen}
                       onClose={() => createGlobalBlockingStore.setCreateGlobalBlockingDialogOpened(false)}
        >
            <DialogTitle>
                {blockedUser
                    ? l('blockUserGlobally_withUsernameSpecified', {username: blockedUser.displayedName})
                    : l('blockUserGlobally')
                }
            </DialogTitle>
            {fetchingUser
                ? <DialogContent>
                    <CircularProgress size={50} color="primary"/>
                </DialogContent>
                : <DialogContent>
                    <TextField label={l('blockingReason')}
                               fullWidth
                               margin="dense"
                               multiline
                               onChange={event => createGlobalBlockingStore.setGlobalBlockingFormValue(event.target.value, 'reason')}
                               error={Boolean(globalBlockingFormErrors.reason)}
                               helperText={globalBlockingFormErrors.reason && l(globalBlockingFormErrors.reason)}
                    />
                    <DateTimePicker label={l('blockingEndDate')}
                                    value={createGlobalBlockingStore.globalBlockingFormValues.endDate}
                                    onChange={date => createGlobalBlockingStore.setGlobalBlockingFormValue(date, 'endDate')}
                                    autoOk
                                    disablePast
                                    cancelLabel={l('cancel')}
                                    openToYearSelection
                                    fullWidth
                                    format="dd-MM-YYYY hh:mm:ss"
                                    clearable
                                    clearLabel={l('clear')}
                    />
                </DialogContent>
            }
            <DialogActions>
                {pending && <CircularProgress size={25} color="secondary"/>}
                {submissionError && <Typography variant="body1"
                                                style={{
                                                    color: 'red'
                                                }}>
                    {l('errorWhenAttemptedToBlockUserGlobally', {errorStatus: submissionError.status || 500})}
                </Typography>}
                {persistedGlobalBlocking && <Typography variant="body1"
                                                        style={{
                                                            color: 'green'
                                                        }}
                >
                    {l('userHasBeenBlockedSuccessfully')}
                </Typography>}
                <Button variant="contained"
                        color="primary"
                        onClick={() => createGlobalBlockingStore.blockUser()}
                >
                    {l('block')}
                </Button>
                <Button variant="outlined"
                        color="secondary"
                        onClick={() => createGlobalBlockingStore.setCreateGlobalBlockingDialogOpened(false)}
                >
                    {persistedGlobalBlocking
                        ? l('close')
                        : l('cancel')
                    }
                </Button>
            </DialogActions>
        </Dialog>
    }
}

CreateGlobalBlockingDialog.propTypes = {
    createGlobalBlockingStore: PropTypes.object,
    fullScreen: PropTypes.bool,
    l: PropTypes.func,
};

export default withMobileDialog()(CreateGlobalBlockingDialog);
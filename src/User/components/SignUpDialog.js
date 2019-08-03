import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {withLocale} from "../../localization";

@withLocale
@inject("signUpStore")
@observer
class SignUpDialog extends React.Component {
    render() {
        const {signUpStore, l, fullScreen} = this.props;
        const {
            signUpFormValues,
            requireEmail,
            signUpFormErrors,
            submitting,
            checkingUsername,
            checkingEmail,
            submissionError,
            persistedUser,
            signUpDialogOpen
        } = signUpStore;

        if (signUpDialogOpen) {
            return (
                <Dialog open={signUpDialogOpen}
                        onClose={() => signUpStore.setSignUpDialogOpen(false)}
                        fullScreen={fullScreen}
                >
                    <DialogTitle>
                        {l('signUp')}
                    </DialogTitle>
                    <DialogContent>
                        <TextField label={l('loginUsername')}
                                       onChange={event => signUpStore.setSignUpFormValue('loginUsername', event.target.value)}
                                       error={Boolean(signUpFormErrors.loginUsername)}
                                       helperText={signUpFormErrors.loginUsername && l(signUpFormErrors.loginUsername)}
                                       fullWidth
                                       margin="dense"
                                       value={signUpFormValues.loginUsername}
                        />
                        <TextField label={l('displayedUsername')}
                                   onChange={event => signUpStore.setSignUpFormValue('displayedUsername', event.target.value)}
                                   error={Boolean(signUpFormErrors.displayedUsername)}
                                   helperText={signUpFormErrors.displayedUsername && l(signUpFormErrors.displayedUsername)}
                                   fullWidth
                                   margin="dense"
                                   value={signUpFormValues.displayedName}
                        />
                        <TextField label={l('password')}
                                   onChange={event => signUpStore.setSignUpFormValue('password', event.target.value)}
                                   error={Boolean(signUpFormErrors.password)}
                                   helperText={l(signUpFormErrors.password)}
                                   fullWidth
                                   margin="dense"
                                   type="password"
                                   value={signUpFormValues.password}
                        />
                        <TextField label={l('repeatPassword')}
                                   onChange={event => signUpStore.setSignUpFormValue('repeatedPassword', event.target.value)}
                                   error={Boolean(signUpFormErrors.repeatedPassword)}
                                   helperText={l(signUpFormErrors.repeatedPassword)}
                                   fullWidth
                                   margin="dense"
                                   type="password"
                                   value={signUpFormValues.repeatedPassword}
                        />
                        <TextField label={l('email')}
                                   onChange={event => signUpStore.setSignUpFormValue('email', event.target.value)}
                                   error={requireEmail && Boolean(signUpFormErrors.email)}
                                   helperText={l(signUpFormErrors.email)}
                                   fullWidth
                                   margin="dense"
                                   disabled={!requireEmail}
                                   value={signUpFormValues.email}
                        />
                        <FormControlLabel control={
                            <CheckBox onChange={event => signUpStore.setRequireEmail(!event.target.checked)}
                                      checked={!requireEmail}
                            />
                        }
                                          label={l('doNotProvideEmail')}
                        />
                        <Button variant="contained"
                                color="primary"
                                fullWidth
                                onClick={signUpStore.doSignUp}
                        >
                            {l('signUp')}
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        {
                            (submitting || checkingUsername || checkingEmail)
                            && <CircularProgress size={25} color="primary"/>
                        }
                        {submissionError && <Typography variant="body1" style={{
                            'color': 'red'
                        }}>
                            {l('errorWhenAttemptedToSignUp', {errorStatus: submissionError.status})}
                        </Typography>}
                        {persistedUser && <Typography variant="body1" style={{
                            'color': 'green'
                        }}>
                            {l('registrationSuccess')}
                        </Typography>}
                        <Button variant="outlined"
                                color="secondary"
                                onClick={() => signUpStore.setSignUpDialogOpen(false)}
                        >
                            {l('cancel')}
                        </Button>
                    </DialogActions>
                </Dialog>
            )
        } else {
            return null;
        }
    }
}

SignUpDialog.propTypes = {
    signUpStore: PropTypes.object,
    l: PropTypes.func,
    onOpen: PropTypes.func,
    fullScreen: PropTypes.bool
};

export default withMobileDialog()(SignUpDialog);
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
import withMobileDialog from '@material-ui/core/withMobileDialog';
import _ from 'lodash';
import {withLocale} from "../../localization";

@withLocale
@inject("signUpStore")
@observer
class SignUpDialog extends React.Component {
    updateLoginUsername = _.debounce(loginUsername => {
        const {signUpStore} = this.props;
        signUpStore.setSignUpFormValue(loginUsername, 'loginUsername');
    });

    render() {
        const {signUpStore, l, fullScreen} = this.props;
        const {signUpFormErrors, submitting, checkingUsername, submissionError, persistedUser, signUpDialogOpen} = signUpStore;

        if (signUpDialogOpen) {
            return <Dialog open={signUpDialogOpen}
                           onClose={() => signUpStore.setSignUpDialogOpen(false)}
                           fullScreen={fullScreen}
            >
                <DialogTitle>
                    {l('signUp')}
                </DialogTitle>
                <DialogContent>
                    <div>
                        <TextField label={l('loginUsername')}
                                   onChange={event => this.updateLoginUsername(event.target.value)}
                                   error={Boolean(signUpFormErrors.loginUsername)}
                                   helperText={signUpFormErrors.loginUsername && l(signUpFormErrors.loginUsername)}
                                   fullWidth
                                   margin="dense"
                        />
                    </div>
                    <TextField label={l('displayedUsername')}
                               onChange={event => signUpStore.setSignUpFormValue(event.target.value, 'displayedUsername')}
                               error={Boolean(signUpFormErrors.displayedUsername)}
                               helperText={signUpFormErrors.displayedUsername && l(signUpFormErrors.displayedUsername)}
                               fullWidth
                               margin="dense"
                    />
                    <TextField label={l('password')}
                               onChange={event => signUpStore.setSignUpFormValue(event.target.value, 'password')}
                               error={Boolean(signUpFormErrors.password)}
                               helperText={l(signUpFormErrors.password)}
                               fullWidth
                               margin="dense"
                               type="password"
                    />
                    <TextField label={l('repeatPassword')}
                               onChange={event => signUpStore.setSignUpFormValue(event.target.value, 'repeatedPassword')}
                               error={Boolean(signUpFormErrors.repeatedPassword)}
                               helperText={l(signUpFormErrors.repeatedPassword)}
                               fullWidth
                               margin="dense"
                               type="password"
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
                    {(submitting || checkingUsername) && <CircularProgress size={25} color="primary"/>}
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
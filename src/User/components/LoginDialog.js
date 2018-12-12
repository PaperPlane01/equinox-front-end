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
import Divider from '@material-ui/core/Divider';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import LoginWithGoogleButton from './LoginWithGoogleButton';
import {withLocale} from "../../localization";

@withLocale
@inject("authStore")
@observer
class LoginDialog extends React.Component {
    render() {
        const {authStore, fullScreen, l} = this.props;
        const {pending, loginFormErrors, loginFormValues, loginError, loginDialogOpen} = authStore;

        if (loginDialogOpen) {
            return <Dialog open={loginDialogOpen}
                           fullScreen={fullScreen}
                           onClose={() => authStore.setLoginDialogOpen(false)}
            >
                <DialogTitle>
                    {l('logIn')}
                </DialogTitle>
                <DialogContent>
                    <TextField label={l('username')}
                               value={loginFormValues.username}
                               error={Boolean(loginFormErrors.username)}
                               helperText={loginFormErrors.username && l(loginFormErrors.username)}
                               onChange={event => authStore.setLoginFormValue(event.target.value, 'username')}
                               fullWidth
                               margin="dense"
                    />
                    <TextField label={l('password')}
                               value={loginFormValues.password}
                               error={Boolean(loginFormErrors.password)}
                               helperText={loginFormErrors.password && l(loginFormErrors.password)}
                               onChange={event => authStore.setLoginFormValue(event.target.value, 'password')}
                               fullWidth
                               margin="dense"
                               type="password"
                    />
                    <Button variant="contained"
                            color="primary"
                            onClick={authStore.doLogin}
                            fullWidth
                    >
                        {l('logIn')}
                    </Button>
                    <Divider style={{
                        marginTop: '5px',
                        marginBottom: '5px'
                    }}/>
                    <LoginWithGoogleButton/>
                </DialogContent>
                <DialogActions>
                    {pending && <CircularProgress color="primary" size={25}/>}
                    {loginError && <Typography style={{
                        color: 'red'
                    }}>
                        {l('errorWhenAttemptedToLogIn')}
                    </Typography>}
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => authStore.setLoginDialogOpen(false)}
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

LoginDialog.propTypes = {
    authStore: PropTypes.object,
    fullScreen: PropTypes.bool,
    l: PropTypes.func,
    onOpen: PropTypes.func
};

export default withMobileDialog()(LoginDialog);
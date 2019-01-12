import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {withLocale} from "../localization";
import {getViewByPath} from '../router-config';
import AppBar from '../AppBar';
import StandardLayout from '../StandardLayout';

@withLocale
@inject('authStore')
@inject('store')
@inject('googleAuthStore')
@observer
class GoogleAuth extends React.Component {
    render() {
        const {l, googleAuthStore, store, authStore} = this.props;

        if (authStore.currentUser) {
            const originalView = getViewByPath(googleAuthStore.originalPath);
            store.router.goTo(originalView, googleAuthStore.originalParams, store, googleAuthStore.originalQueryParams);
        }

        const content = googleAuthStore.error
            ? <Typography variant="headline">
                {l('errorWhenAttemptedToLogInWithGoogle', {errorStatus: googleAuthStore.error.status})}
            </Typography>
            : <React.Fragment>
                <Typography variant="headline">
                    {l('loggingInWithGoogle')}
                </Typography>
                <CircularProgress color="primary" size={20}/>
            </React.Fragment>;

        return <Grid container>
            <Grid item xs={12}>
                <AppBar/>
            </Grid>
            <Grid item xs={12}>
                <StandardLayout>
                    {content}
                </StandardLayout>
            </Grid>
        </Grid>
    }
}

GoogleAuth.propTypes = {
    l: PropTypes.func,
    googleAuthStore: PropTypes.object,
    store: PropTypes.object
};

export default GoogleAuth;
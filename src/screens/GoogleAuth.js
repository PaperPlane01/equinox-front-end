import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {withLocale} from "../localization";
import {getViewByPath} from '../router-config';
import AppBar from '../AppBar';

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

        return <Grid container>
            <Grid item xs={12}>
                <AppBar/>
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
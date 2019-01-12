import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StandardLayout from '../StandardLayout';
import AppBar from '../AppBar';
import {GlobalBlockingsList} from "../GlobalBlocking/components";
import {canSeeGlobalBlockings} from "../GlobalBlocking/permissions";
import {withLocale} from "../localization";

@withLocale
@inject('authStore')
@observer
class GlobalBlockings extends React.Component {
    render() {
        const {authStore, l} = this.props;
        const {currentUser} = authStore;

        const content = canSeeGlobalBlockings(currentUser)
            ? <GlobalBlockingsList/>
            : <Typography variant="headline">
                {l('accessToPageDenied')}
            </Typography>;

        return <Grid container>
            <Grid item xs={12}>
                <AppBar title={l('globalBlockings')}/>
            </Grid>
            <Grid item xs={12}>
                <StandardLayout>
                    {content}
                </StandardLayout>
            </Grid>
        </Grid>
    }
}

GlobalBlockings.propTypes = {
    authStore: PropTypes.object,
    l: PropTypes.func
};

export default GlobalBlockings;
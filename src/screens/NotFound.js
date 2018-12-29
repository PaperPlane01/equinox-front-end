import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '../AppBar';
import StandardLayout from '../StandardLayout';
import {withLocale} from "../localization";

@withLocale
class NotFound extends React.Component {
    render() {
        const {l} = this.props;

        return <Grid container>
            <Grid item xs={12}>
                <AppBar/>
            </Grid>
            <StandardLayout>
                <Typography variant="headline">{l('pageNotFound')}</Typography>
            </StandardLayout>
        </Grid>
    }
}

export default NotFound;
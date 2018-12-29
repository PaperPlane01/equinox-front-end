import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withLocale} from "../localization";
import StandardLayout from '../StandardLayout';
import AppBar from '../AppBar';
import {EditProfileForm} from '../User';

@withLocale
@inject('authStore')
@observer
class EditProfile extends React.Component {
    render() {
        const {authStore, l} = this.props;

        return <Grid container>
            <Grid container>
                <Grid item xs={12}>
                    <AppBar title={l('editProfile')}/>
                </Grid>
                <StandardLayout>
                    {authStore.loggedIn
                        ? <Card raised style={{
                            marginTop: '18px'
                        }}>
                            <CardContent>
                                <EditProfileForm/>
                            </CardContent>
                        </Card>
                        : <Typography variant="headline">
                            {l('loginRequired')}
                        </Typography>}
                </StandardLayout>
            </Grid>
        </Grid>
    }
}

EditProfile.propTypes = {
    l: PropTypes.func,
    authStore: PropTypes.object
};

export default EditProfile;
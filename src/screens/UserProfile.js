import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import AppBar from '../AppBar';
import StandardLayout from '../StandardLayout';
import {UserProfileAvatar, UserProfileCard, UserSubscriptionsBlock, canEditProfile} from "../User";
import {withLocale} from "../localization";

@withLocale
@inject('authStore')
@inject('userProfileStore')
@observer
class UserProfile extends React.Component {
    renderUserProfile = () => {
        const {userProfileStore, authStore, l} = this.props;
        const {user, pending, error} = userProfileStore;

        if (pending) {
            return <CircularProgress color="primary"
                                     size={100}
                                     style={{
                                         marginLeft: 'calc(50% - 50px)',
                                     }}
            />
        }

        if (error) {
            return <Typography variant="header">
                {error.status === 404 || error.status === 400
                    ? l('userNotFound')
                    : l('errorWhenAttemptedToFetchUserProfile', {errorStatus: error.status})}
            </Typography>
        }

        if (user) {
            return <Grid container spacing={16}>
                <Grid item xs={12} lg={3}>
                    <UserProfileAvatar avatarUri={user.avatarUri}/>
                </Grid>
                <Grid item xs={12} lg={9}>
                    <UserProfileCard displayedName={user.displayedName}
                                     email={user.email}
                                     bio={user.bio}
                                     birthDate={user.birthDate}
                                     displayEditButton={canEditProfile(authStore.currentUser, user.id)}
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <UserSubscriptionsBlock/>
                </Grid>
            </Grid>
        }
    };

    render() {
        return <Grid container>
            <Grid item xs={12}>
                <AppBar/>
            </Grid>
            <StandardLayout>
                {this.renderUserProfile()}
            </StandardLayout>
        </Grid>
    }
}

UserProfile.propTypes = {
    userProfileStore: PropTypes.object,
    authStore: PropTypes.object,
    l: PropTypes.func
};

export default UserProfile;

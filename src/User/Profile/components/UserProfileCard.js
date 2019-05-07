import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import EditProfileButton from "./EditProfileButton";
import {withLocale} from "../../../localization/index";

@withLocale
@observer
class UserProfileCard extends React.Component {
    render() {
        const {l, birthDate, bio, email, displayedName, displayEditButton} = this.props;

        return <Card>
            <CardContent>
                {displayEditButton && <div style={{
                    display: 'inline',
                    float: 'right'
                }}>
                    <EditProfileButton/>
                </div>}
                <Typography variant="subheading">
                    {l('displayedName')}: {displayedName}
                </Typography>
                <Typography variant="subheading">
                    {l('email')}: {email || l('notSpecified')}
                </Typography>
                <Typography variant="subheading">
                    {l('bio')}: {bio || l('notSpecified')}
                </Typography>
                <Typography variant="subheading">
                    {l('birthDate')}: {moment(birthDate).format('DD-MM-YYYY') || l('notSpecified')}
                </Typography>
            </CardContent>
        </Card>
    }
}

UserProfileCard.propTypes = {
    l: PropTypes.func,
    bio: PropTypes.string,
    email: PropTypes.string,
    birthDate: PropTypes.string,
    displayedName: PropTypes.string,
    displayEditButton: PropTypes.bool
};

export default UserProfileCard;
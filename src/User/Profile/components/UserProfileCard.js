import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withLocale} from "../../../localization/index";

@withLocale
@observer
class UserProfileCard extends React.Component {
    render() {
        const {l, birthDate, bio, email, displayedName} = this.props;

        return <Card>
            <CardContent>
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
                    {l('birthDate')}: {birthDate || l('notSpecified')}
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
    displayedName: PropTypes.string
};

export default UserProfileCard;
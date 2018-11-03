import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class UserProfileAvatar extends React.Component {
    render() {
        const {avatarUri} = this.props;

        return  <Card>
            <CardContent>
                <img src={avatarUri ? avatarUri : 'http://www.pd4pic.com/images/avatar-person-neutral-man-blank-face-buddy.png'}
                     width="100%"
                     height="100%"
                     alt=""
                />
            </CardContent>
        </Card>
    }
}

UserProfileAvatar.propTypes = {
    avatarUri: PropTypes.string
};

export default UserProfileAvatar;
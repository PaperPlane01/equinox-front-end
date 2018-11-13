import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '../../Avatar';
import {withLocale} from "../../localization";

@withLocale
class GlobalBlockingNotification extends React.Component {
    handleClick = () => {
        const {onClick} = this.props;

        if (onClick) {
            onClick();
        }
    };

    render() {
        const {l, globalBlocking} = this.props;

        return <div onClick={this.handleClick}>
            <CardHeader avatar={<Avatar height={60}
                                        width={60}
                                        avatarUri={globalBlocking.blockedBy.avatarUri}
                                        avatarColor={globalBlocking.blockedBy.letterAvatarColor}
                                        avatarLetter={globalBlocking.blockedBy.displayedName[0]}
            />}
                        title={l('youWereBlockedGlobally', {blockedByUsername: globalBlocking.blockedBy.displayedName})}
            />
        </div>
    }
}

GlobalBlockingNotification.propTypes = {
    onClick: PropTypes.func,
    l: PropTypes.func,
    globalBlocking: PropTypes.object
};

export default GlobalBlockingNotification;
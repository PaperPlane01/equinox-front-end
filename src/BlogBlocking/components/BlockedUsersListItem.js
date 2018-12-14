import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BlogBlockingActionsMenu from './BlogBlockingActionsMenu';
import Avatar from '../../Avatar';
import views from '../../router-config';

@inject('store')
@observer
class BlockedUsersListItem extends React.Component {
    render() {
        const {blocking, store} = this.props;
        const {blockedUser} = blocking;

        return <ListItem>
            <Avatar height={60}
                    width={60}
                    avatarUri={blockedUser.avatarUri}
                    avatarColor={blockedUser.letterAvatarColor}
                    avatarLetter={blockedUser.displayedName[0]}
            />
            <ListItemText>
                <Link store={store}
                      view={views.userProfile}
                      params={{id: blockedUser.id}}
                      style={{textDecoration: 'none'}}
                >
                    {blockedUser.displayedName}
                </Link>
            </ListItemText>
            <BlogBlockingActionsMenu blogBlocking={blocking}/>
        </ListItem>
    }
}

BlockedUsersListItem.propTypes = {
    blocking: PropTypes.object,
    store: PropTypes.object
};

export default BlockedUsersListItem;
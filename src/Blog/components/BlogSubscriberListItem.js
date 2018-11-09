import React from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import {Link} from 'mobx-router';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BlogSubscriberActionsMenu from './BlogSubscriberActionsMenu';
import Avatar from '../../Avatar';
import views from '../../router-config';

@inject('store')
class BlogSubscriberListItem extends React.Component {
    render() {
        const {store, subscription} = this.props;
        const {user} = subscription;

        return <ListItem>
            <Avatar width={60}
                    height={60}
                    avatarLetter={user.displayedName[0]}
                    avatarColor={user.letterAvatarColor}
                    avatarUri={user.avatarUri}
            />
            <ListItemText>
                <Link store={store}
                      view={views.userProfile}
                      params={{id: user.id}}
                      style={{textDecoration: 'none'}}
                >
                    {user.displayedName}
                </Link>
            </ListItemText>
            <BlogSubscriberActionsMenu subscription={subscription}/>
        </ListItem>
    }
}

BlogSubscriberListItem.propTypes = {
    store: PropTypes.object,
    subscription: PropTypes.object
};

export default BlogSubscriberListItem;
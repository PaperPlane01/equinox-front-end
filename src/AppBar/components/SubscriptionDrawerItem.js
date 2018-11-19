import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import Avatar from '../../Avatar';
import views from '../../router-config';

@inject('store')
@inject('appBarStore')
@observer
class SubscriptionDrawerItem extends React.Component {
    render() {
        const {blogId, blogAvatarUri, blogName, blogLetterAvatarColor, store, appBarStore} = this.props;

        return <Link view={views.blog}
                     store={store}
                     params={{id: blogId}}
                     style={{
                         textDecoration: 'none'
                     }}
        >
            <ListItem onClick={() => appBarStore.setDrawerOpened(false)}>
                <Avatar avatarLetter={blogName[0]}
                        avatarColor={blogLetterAvatarColor}
                        avatarUri={blogAvatarUri}
                        width={60}
                        height={60}
                />
                <ListItemText>
                    {blogName}
                </ListItemText>
            </ListItem>
        </Link>
    }
}

SubscriptionDrawerItem.propTypes = {
    blogId: PropTypes.number,
    blogName: PropTypes.string,
    blogAvatarUri: PropTypes.string,
    blogLetterAvatarColor: PropTypes.string,
    store: PropTypes.object,
    appBarStore: PropTypes.object
};

export default SubscriptionDrawerItem;
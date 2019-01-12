import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import Avatar from '../../Avatar';
import views from '../../router-config';
import closeDrawer from './closeDrawer';

@closeDrawer
@inject('store')
@observer
class LinkToBlogDrawerItem extends React.Component {
    render() {
        const {blogId, blogAvatarUri, blogName, blogLetterAvatarColor, store, closeDrawer} = this.props;

        return <Link view={views.blog}
                     store={store}
                     params={{id: blogId}}
                     style={{
                         textDecoration: 'none'
                     }}
        >
            <ListItem onClick={closeDrawer}>
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

LinkToBlogDrawerItem.propTypes = {
    blogId: PropTypes.number,
    blogName: PropTypes.string,
    blogAvatarUri: PropTypes.string,
    blogLetterAvatarColor: PropTypes.string,
    store: PropTypes.object,
    closeDrawer: PropTypes.func
};

export default LinkToBlogDrawerItem;
import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BlogManagerActionsMenu from './BlogManagerActionsMenu';
import Avatar from '../../Avatar';
import {withLocale} from "../../localization";
import views from '../../router-config';

@withLocale
@inject('store')
@observer
class BlogManagersListItem extends React.Component {
    render() {
        const {store, blogManager, l} = this.props;
        const {user} = blogManager;

        return <ListItem>
            <Avatar avatarUri={user.avatarUri}
                    height={60}
                    width={60}
                    avatarLetter={user.displayedName[0]}
                    avatarColor={user.letterAvatarColor}
            />
            <ListItemText>
                <Link store={store}
                      view={views.userProfile}
                      params={{id : user.id}}
                      style={{textDecoration: 'none'}}
                >
                    {user.displayedName}
                </Link> — {l(blogManager.blogRole)}
            </ListItemText>
            <BlogManagerActionsMenu blogManager={blogManager}/>
        </ListItem>
    }
}

BlogManagersListItem.propTypes = {
    blogManager: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func
};

export default BlogManagersListItem;
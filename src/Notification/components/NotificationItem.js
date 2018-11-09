import React from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import {Link} from 'mobx-router';
import Divider from '@material-ui/core/Divider';
import NewBlogPostNotification from './NewBlogPostNotification';
import BlogBlockingNotification from './BlogBlockingNotification';
import NotificationType from '../NotificationType';
import {withLocale} from "../../localization";
import views from '../../router-config';

@inject('store')
@withLocale
class NotificationItem extends React.Component {
    handleClick = () => {
        const {onClick} = this.props;

        if (onClick) {
            onClick();
        }
    };

    render() {
        const {store, notification} = this.props;
        switch (notification.type) {
            case NotificationType.NEW_BLOG_POST:
                return <Link store={store}
                             view={views.blogPost}
                             params={{id: notification.blogPost.id}}
                             style={{
                                 textDecoration: 'none'
                             }}
                >
                    <NewBlogPostNotification onClick={this.handleClick}
                                             blogPost={notification.blogPost}
                    />
                </Link>;
            case NotificationType.BLOG_BLOCKING:
                return  <Link store={store}
                              view={views.blog}
                              params={{id: notification.blogBlocking.blog.id}}
                              style={{textDecoration: 'none'}}
                >
                    <BlogBlockingNotification onClick={this.handleClick}
                                              blogBlocking={notification.blogBlocking}
                    />
                </Link>;
            default:
                return null;
        }
    }
}

NotificationItem.propTypes = {
    notification: PropTypes.object,
    store: PropTypes.object,
    onClick: PropTypes.func,
    l: PropTypes.object
};

export default NotificationItem;
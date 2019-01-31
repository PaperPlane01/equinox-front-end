import React from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import {Link} from 'mobx-router';
import NewBlogPostNotification from './NewBlogPostNotification';
import BlogBlockingNotification from './BlogBlockingNotification';
import NewCommentLikeNotification from './NewCommentLikeNotification';
import GlobalBlockingNotification from './GlobalBlockingNotification';
import NewCommentReplyNotification from './NewCommentReplyNotification';
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
            case NotificationType.NEW_COMMENT_LIKE: {
                const rootCommentAtTopId = notification.comment.rootCommentId
                    ? notification.comment.rootCommentId
                    : notification.comment.id;
                const highlightedCommentId = notification.comment.id;
                return <Link store={store}
                             view={views.blogPost}
                             params={{id: notification.comment.blogPostId}}
                             queryParams={{rootCommentAtTopId, highlightedCommentId}}
                             style={{textDecoration: 'none'}}
                >
                    <NewCommentLikeNotification onClick={this.handleClick}
                                                comment={notification.comment}
                                                commentLike={notification.commentLike}
                    />
                </Link>;
            }
            case NotificationType.GLOBAL_BLOCKING:
                return <GlobalBlockingNotification onClick={this.handleClick}
                                                   globalBlocking={notification.globalBlocking}
                />;
            case NotificationType.NEW_COMMENT_REPLY: {
                const rootCommentAtTopId = notification.referredComment.rootCommentId
                    ? notification.referredComment.rootCommentId
                    : notification.referredComment.id;
                const highlightedCommentId = notification.reply.id;
                return <Link store={store}
                             view={views.blogPost}
                             params={{id: notification.reply.blogPostId}}
                             queryParams={{rootCommentAtTopId, highlightedCommentId}}
                             style={{textDecoration: 'none'}}
                >
                    <NewCommentReplyNotification onClick={this.handleClick}
                                                 reply={notification.reply}
                    />
                </Link>;
            }
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
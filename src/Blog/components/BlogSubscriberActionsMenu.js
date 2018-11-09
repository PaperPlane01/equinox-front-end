import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {BlockUserInBlogMenuItem, BlogBlockingDialog} from '../BlogBlocking'
import {canBlockUserInBlog} from "../permissions";

@inject('createBlogBlockingStore')
@inject('authStore')
@observer
class BlogSubscriberActionsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorElement: null
        }
    }

    openMenu = event => {
        this.setState({
            anchorElement: event.target
        })
    };

    closeMenu = () => {
        this.setState({
            anchorElement: null
        })
    };

    handleBlockUserMenuItemClick = userId => {
        this.closeMenu();
        this.props.createBlogBlockingStore.setBlockedUserId(userId);
        this.props.createBlogBlockingStore.setCreateBlogBlockingDialogOpened(true);
    };

    render() {
        const {subscription, authStore, createBlogBlockingStore} = this.props;

        const items = [];

        canBlockUserInBlog(authStore.currentUser, subscription.blogId) && items
            .push(<BlockUserInBlogMenuItem onClick={this.closeMenu}
                                           blockedUserId={subscription.user.id}
            />);

        if (items.length !== 0) {
            const menuId = `subscriptionMenuId-${subscription.id}`;
            const {anchorElement} = this.state;

            return <div>
                <IconButton onClick={this.openMenu}>
                    <MoreVertIcon/>
                </IconButton>
                <Menu id={menuId}
                      anchorEl={anchorElement}
                      open={Boolean(anchorElement)}
                      onClose={this.closeMenu}
                      anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                      transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                >
                    {items}
                </Menu>
                {createBlogBlockingStore.blockedUserId === subscription.user.id
                && <BlogBlockingDialog blogId={subscription.blogId}/>}
            </div>
        } else {
            return null;
        }
    }
}

BlogSubscriberActionsMenu.propTypes = {
    authStore: PropTypes.object,
    createBlogBlockingStore: PropTypes.object,
    subscription: PropTypes.object
};

export default BlogSubscriberActionsMenu;
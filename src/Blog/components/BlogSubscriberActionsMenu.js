import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {BlockUserInBlogMenuItem, BlogBlockingDialog} from '../BlogBlocking'
import {canBlockUserInBlog} from "../permissions";
import {BlockUserGloballyMenuItem, CreateGlobalBlockingDialog, canBlockUser} from '../../User';

@inject('createBlogBlockingStore')
@inject('createGlobalBlockingStore')
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

    handleBlockUserGloballyMenuItemClick = () => {
        this.closeMenu();

        const {createGlobalBlockingStore, subscription} = this.props;
        createGlobalBlockingStore.setBlockedUser(subscription.user);
    };

    render() {
        const {subscription, authStore, createBlogBlockingStore, createGlobalBlockingStore} = this.props;

        const items = [];

        canBlockUserInBlog(authStore.currentUser, subscription.blogId) && items
            .push(<BlockUserInBlogMenuItem onClick={this.closeMenu}
                                           blockedUserId={subscription.user.id}
            />);

        canBlockUser(authStore.currentUser) && items
            .push(<BlockUserGloballyMenuItem onClick={this.handleBlockUserGloballyMenuItemClick}/>);

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
                {canBlockUserInBlog(authStore.currentUser, subscription.blogId)
                && createBlogBlockingStore.blockedUserId === subscription.user.id
                && <BlogBlockingDialog blogId={subscription.blogId}/>}
                {canBlockUser(authStore.currentUser)
                && createGlobalBlockingStore.blockedUser
                && createGlobalBlockingStore.blockedUser.id === subscription.user.id
                && <CreateGlobalBlockingDialog/>
                }
            </div>
        } else {
            return null;
        }
    }
}

BlogSubscriberActionsMenu.propTypes = {
    authStore: PropTypes.object,
    createBlogBlockingStore: PropTypes.object,
    createGlobalBlockingStore: PropTypes.object,
    subscription: PropTypes.object
};

export default BlogSubscriberActionsMenu;
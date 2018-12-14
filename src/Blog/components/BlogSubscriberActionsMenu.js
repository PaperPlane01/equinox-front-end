import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {BlockUserInBlogMenuItem, BlogBlockingDialog} from '../../BlogBlocking'
import {AssignUserBlogManagerMenuItem, AssignUserBlogManagerDialog} from '../../BlogManager'
import {canBlockUserInBlog, canAssignBlogManagersInBlog} from "../permissions";
import {BlockUserGloballyMenuItem, CreateGlobalBlockingDialog, canBlockUser} from '../../User';

@inject('createBlogManagerStore')
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
        const {subscription, authStore, createBlogBlockingStore, createGlobalBlockingStore,
            createBlogManagerStore} = this.props;

        const items = [];

        const _canBlockUserInBlog = canBlockUserInBlog(authStore.currentUser, subscription.blogId) && items
            .push(<BlockUserInBlogMenuItem onClick={this.closeMenu}
                                           blockedUserId={subscription.user.id}
            />);

        const _canBlockUserGlobally = canBlockUser(authStore.currentUser) && items
            .push(<BlockUserGloballyMenuItem onClick={this.handleBlockUserGloballyMenuItemClick}/>);

        const _canAssignBlogManagers = canAssignBlogManagersInBlog(authStore.currentUser, subscription.blogId)
            && items.push(<AssignUserBlogManagerMenuItem blogId={subscription.blogId}
                                                         userId={subscription.user.id}
                                                         onClick={this.closeMenu}
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
                {
                    _canBlockUserInBlog && createBlogBlockingStore.blockedUserId === subscription.user.id
                    && <BlogBlockingDialog blogId={subscription.blogId}/>}
                {
                    _canBlockUserGlobally
                    && createGlobalBlockingStore.blockedUser
                    && createGlobalBlockingStore.blockedUser.id === subscription.user.id
                    && <CreateGlobalBlockingDialog/>
                }
                {
                    _canAssignBlogManagers
                    && createBlogManagerStore.blogId === subscription.blogId
                    && createBlogManagerStore.userId === subscription.user.id
                    && <AssignUserBlogManagerDialog/>
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
    createBlogManagerStore: PropTypes.object,
    subscription: PropTypes.object
};

export default BlogSubscriberActionsMenu;
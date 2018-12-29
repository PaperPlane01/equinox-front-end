import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteBlogPostMenuItem from './DeleteBlogPostMenuItem';
import DeleteBlogPostDialog from './DeleteBlogPostDialog';
import EditBlogPostMenuItem from './EditBlogPostMenuItem';
import {BlockUserGloballyMenuItem, CreateGlobalBlockingDialog, canBlockUser} from "../../User";
import * as blogPostPermissions from "../permissions";

@inject('authStore')
@inject('blockBlogPostAuthorStore')
@observer
class BlogPostActionsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorElement: undefined
        }
    };

    openMenu = event => {
        this.setState({
            anchorElement: event.currentTarget
        })
    };

    closeMenu = () => {
        this.setState({anchorElement: null});
    };

    handleBlockBlogPostAuthorMenuItemClick = () => {
        this.closeMenu();

        const {blockBlogPostAuthorStore, blogPost} = this.props;
        blockBlogPostAuthorStore.setBlogPostPublisher(blogPost.publisher);
        blockBlogPostAuthorStore.setBlogPostId(blogPost.id);
    };

    render() {
        const {authStore, blogPost, blockBlogPostAuthorStore} = this.props;
        const items = [];

        const canDeleteBlogPost = blogPostPermissions.canDeleteBlogPost(authStore.currentUser, blogPost);
        const canBlockAuthor = canBlockUser(authStore.currentUser);
        const canEditBlogPost = blogPostPermissions.canEditBlogPost(authStore.currentUser, blogPost);

        if (canDeleteBlogPost) {
            items.push(<DeleteBlogPostMenuItem onClick={this.closeMenu}
                                               blogPostId={blogPost.id}
            />)
        }

        if (canBlockAuthor) {
            items.push(<BlockUserGloballyMenuItem onClick={this.handleBlockBlogPostAuthorMenuItemClick}/>)
        }

        if (canEditBlogPost) {
            items.push(<EditBlogPostMenuItem onClick={this.closeMenu} blogPostId={blogPost.id}/>)
        }

        if (items.length !== 0) {
            const menuId = `blogPostActionsMenu-${blogPost.id}`;
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
                {canDeleteBlogPost && <DeleteBlogPostDialog blogPostId={blogPost.id}/>}
                {(canBlockAuthor && blockBlogPostAuthorStore.blogPostId === blogPost.id) && <CreateGlobalBlockingDialog/>}
            </div>
        } else {
            return null;
        }
    }
}

BlogPostActionsMenu.propTypes = {
    authStore: PropTypes.object,
    blockBlogPostAuthorStore: PropTypes.object,
    blogPost: PropTypes.object
};

export default BlogPostActionsMenu;
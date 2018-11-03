import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteBlogPostMenuItem from './DeleteBlogPostMenuItem';
import DeleteBlogPostDialog from './DeleteBlogPostDialog';
import {canDeleteBlogPost} from "../permissions";

@inject('authStore')
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

    render() {
        const {authStore, blogPost} = this.props;
        let shouldShowMenu = false;

        const items = (<div>
            {canDeleteBlogPost(authStore.currentUser, blogPost) && <DeleteBlogPostMenuItem blogPostId={blogPost.id}
                                                                                           onClick={this.closeMenu}
            >
                {shouldShowMenu = true}
            </DeleteBlogPostMenuItem>}
        </div>);

        if (shouldShowMenu) {
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
                {canDeleteBlogPost(authStore.currentUser, blogPost) && <DeleteBlogPostDialog blogPostId={blogPost.id}/>}
            </div>
        } else {
            return null;
        }
    }
}

BlogPostActionsMenu.propTypes = {
    authStore: PropTypes.object,
    blogPost: PropTypes.object
};

export default BlogPostActionsMenu;
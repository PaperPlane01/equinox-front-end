import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteCommentMenuItem from './DeleteCommentMenuItem';
import {canDeleteComment, canRestoreComment} from "../permissions";
import RestoreCommentMenuItem from "./RestoreCommentMenuItem";
import {canBlockUserInBlog, BlogBlockingDialog, BlockUserInBlogMenuItem} from "../../Blog";

@inject('blockCommentAuthorInBlogStore')
@inject('createBlogBlockingStore')
@inject('authStore')
@observer
class CommentActionsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorElement: undefined
        }
    }

    openMenu = event => {
        this.setState({anchorElement: event.target});
    };

    closeMenu = () => {
        this.setState({anchorElement: null});
    };

    render() {
        const {authStore, createBlogBlockingStore, comment, blockCommentAuthorInBlogStore} = this.props;
        const items = [];

        canDeleteComment(authStore.currentUser, comment) && items.push(<DeleteCommentMenuItem commentId={comment.id}
                                                                                             onClick={this.closeMenu}
        />);

        canRestoreComment(authStore.currentUser, comment) && items.push(<RestoreCommentMenuItem commentId={comment.id}
                                                                                               onClick={this.closeMenu}
        />);

        canBlockUserInBlog(authStore.currentUser, comment.blogId) && items
            .push(<BlockUserInBlogMenuItem onClick={() => {
                this.closeMenu();
                blockCommentAuthorInBlogStore.setCommentId(comment.id)
            }}
                                           blockedUserId={comment.author.id}
        />);

        if (items.length !== 0) {
            const menuId = `commentActionsMenu-${comment.id}`;
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
                {createBlogBlockingStore.blockedUserId === comment.author.id
                && blockCommentAuthorInBlogStore.commentId === comment.id
                && <BlogBlockingDialog blogId={comment.blogId}/>
                };
            </div>
        } else {
            return null;
        }
    }
}

CommentActionsMenu.propTypes = {
    comment: PropTypes.object,
    authStore: PropTypes.object,
    createBlogBlockingStore: PropTypes.object,
    blockCommentAuthorInBlogStore: PropTypes.object
};

export default CommentActionsMenu;
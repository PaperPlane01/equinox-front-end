import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteCommentMenuItem from './DeleteCommentMenuItem';
import {canDeleteComment, canRestoreComment} from "../permissions";
import RestoreCommentMenuItem from "./RestoreCommentMenuItem";

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
        const {authStore, comment} = this.props;
        let shouldShowMenu = false;

        const items = (<div>
            {canDeleteComment(authStore.currentUser, comment) && <DeleteCommentMenuItem commentId={comment.id}
                                                                                        onClick={this.closeMenu}
            >
                {shouldShowMenu = true}
            </DeleteCommentMenuItem>}
            {canRestoreComment(authStore.currentUser, comment) && <RestoreCommentMenuItem commentId={comment.id}
                                                                                         onClick={this.closeMenu}
            >
                {shouldShowMenu = true}
            </RestoreCommentMenuItem>}
        </div>);

        if (shouldShowMenu) {
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
            </div>
        } else {
            return null;
        }
    }
}

CommentActionsMenu.propTypes = {
    comment: PropTypes.object,
    authStore: PropTypes.object
};

export default CommentActionsMenu;
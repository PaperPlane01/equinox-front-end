import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import {withLocale} from "../../localization";

@withLocale
@inject('deleteCommentStore')
@observer
class DeleteCommentMenuItem extends React.Component {
    handleClick = () => {
        const {deleteCommentStore, commentId, onClick} = this.props;

        if (onClick) {
            onClick();
        }

        deleteCommentStore.deleteComment(commentId);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <DeleteIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('delete')}
            </ListItemText>
        </MenuItem>
    }
}

DeleteCommentMenuItem.propTypes = {
    commentId: PropTypes.number,
    deleteCommentStore: PropTypes.object,
    l: PropTypes.func,
    onClick: PropTypes.func
};

export default DeleteCommentMenuItem;
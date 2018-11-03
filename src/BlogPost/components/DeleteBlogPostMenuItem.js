import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import {withLocale} from "../../localization";

@withLocale
@inject('deleteBlogPostDialogStore')
@observer
class DeleteBlogPostMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, deleteBlogPostDialogStore, blogPostId} = this.props;

        if (onClick) {
            onClick();
        }

        deleteBlogPostDialogStore.setBlogPostId(blogPostId);
        deleteBlogPostDialogStore.setDeleteBlogPostDialogOpened(true);
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

DeleteBlogPostMenuItem.propTypes = {
    onClick: PropTypes.func,
    l: PropTypes.func,
    deleteBlogPostDialogStore: PropTypes.object,
    blogPostId: PropTypes.number
};

export default DeleteBlogPostMenuItem;
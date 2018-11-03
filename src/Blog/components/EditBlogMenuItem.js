import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import ListItemText from '@material-ui/core/ListItem';
import {withLocale} from "../../localization";

@withLocale
@inject('editBlogDialogStore')
@observer
class EditBlogMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, editBlogDialogStore} = this.props;

        if (onClick) {
            onClick();
        }

        editBlogDialogStore.setEditBlogFormDialogOpen(true);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <EditIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('edit')}
            </ListItemText>
        </MenuItem>
    }
}

EditBlogMenuItem.propTypes = {
    onClick: PropTypes.func,
    l: PropTypes.func,
    editBlogDialogStore: PropTypes.object
};

export default EditBlogMenuItem;
import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import {withLocale} from "../../localization";

@withLocale
@inject('updateBlogManagerStore')
@observer
class EditBlogManagerMenuItem extends React.Component {
    handleClick = () => {
        const {managerId, updateBlogManagerStore, onClick} = this.props;

        if (onClick) {
            onClick();
        }

        updateBlogManagerStore.setBlogManagerId(managerId);
        updateBlogManagerStore.setUpdateBlogManagerDialogOpen(true);
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

EditBlogManagerMenuItem.propTypes = {
    managerId: PropTypes.number,
    updateBlogManagerStore: PropTypes.object,
    onClick: PropTypes.func,
    l: PropTypes.func
};

export default EditBlogManagerMenuItem;
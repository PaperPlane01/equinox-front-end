import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import {withLocale} from "../../localization";

@withLocale
@inject('deleteBlogManagerStore')
@observer
class DeleteBlogManagerMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, deleteBlogManagerStore, managerId} = this.props;

        if (onClick) {
            onClick();
        }

        deleteBlogManagerStore.setBlogManagerId(managerId);
        deleteBlogManagerStore.setDeleteBlogManagerDialogOpen(true);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <PersonAddDisabledIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('deleteBlogManager')}
            </ListItemText>
        </MenuItem>
    }
}

DeleteBlogManagerMenuItem.propTypes = {
    onClick: PropTypes.func,
    deleteBlogManagerStore: PropTypes.object,
    managerId: PropTypes.number,
    l: PropTypes.func
};

export default DeleteBlogManagerMenuItem;
import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {withLocale} from "../../localization/index";

@withLocale
@inject('createBlogManagerStore')
@observer
class AssignUserBlogManagerMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, userId, blogId, createBlogManagerStore} = this.props;

        if (onClick) {
            onClick();
        }

        createBlogManagerStore.setBlogId(blogId);
        createBlogManagerStore.setUserId(userId);
        createBlogManagerStore.setCreateBlogManagerDialogOpen(true);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <PersonAddIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('assignUserABlogManager')}
            </ListItemText>
        </MenuItem>
    }
}

AssignUserBlogManagerMenuItem.propTypes = {
    onClick: PropTypes.func,
    l: PropTypes.func,
    createBlogManagerStore: PropTypes.object,
    userId: PropTypes.number,
    blogId: PropTypes.number
};

export default AssignUserBlogManagerMenuItem;
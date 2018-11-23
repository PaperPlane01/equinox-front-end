import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import {withLocale} from "../../../localization";

@withLocale
@inject('updateBlogBlockingStore')
@observer
class UpdateBlogBlockingMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, updateBlogBlockingStore, blockingId} = this.props;

        if (onClick) {
            onClick();
        }

        updateBlogBlockingStore.setBlogBlockingId(blockingId);
        updateBlogBlockingStore.setUpdateBlogBlockingDialogOpen(true);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <EditIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('updateBlogBlocking')}
            </ListItemText>
        </MenuItem>
    }
}

UpdateBlogBlockingMenuItem.propTypes = {
    l: PropTypes.func,
    updateBlogBlockingStore: PropTypes.object,
    blockingId: PropTypes.number,
    onClick: PropTypes.func
};

export default UpdateBlogBlockingMenuItem;
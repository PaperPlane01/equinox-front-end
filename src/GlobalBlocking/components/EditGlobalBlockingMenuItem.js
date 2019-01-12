import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import {withLocale} from "../../localization";

@withLocale
@inject('updateGlobalBlockingStore')
@observer
class EditGlobalBlockingMenuItem extends React.Component {
    handleClick = () => {
        const {updateGlobalBlockingStore, onClick, globalBlockingId} = this.props;

        if (onClick) {
            onClick();
        }

        updateGlobalBlockingStore.setGlobalBlockingId(globalBlockingId);
        updateGlobalBlockingStore.setUpdateGlobalBlockingDialogOpen(true);
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

EditGlobalBlockingMenuItem.propTypes = {
    updateGlobalBlockingStore: PropTypes.object,
    l: PropTypes.func,
    globalBlockingId: PropTypes.number,
    onClick: PropTypes.func
};

export default EditGlobalBlockingMenuItem;
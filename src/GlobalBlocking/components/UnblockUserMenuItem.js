import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {withLocale} from "../../localization";

@withLocale
@inject('deleteGlobalBlockingStore')
@observer
class UnblockUserMenuItem extends React.Component {
    handleClick = () => {
        const {globalBlockingId, deleteGlobalBlockingStore, onClick} = this.props;

        if (onClick) {
            onClick();
        }

        deleteGlobalBlockingStore.setGlobalBlockingId(globalBlockingId);
        deleteGlobalBlockingStore.setDeleteGlobalBlockingDialogOpen(true);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <VerifiedUserIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('unblock')}
            </ListItemText>
        </MenuItem>
    }
}

UnblockUserMenuItem.propTypes = {
    globalBlockingId: PropTypes.number,
    onClick: PropTypes.func,
    deleteGlobalBlockingStore: PropTypes.object,
    l: PropTypes.func
};

export default UnblockUserMenuItem;
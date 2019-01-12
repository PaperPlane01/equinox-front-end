import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BlockIcon from '@material-ui/icons/Block';
import {withLocale} from "../../localization/index";

@withLocale
@inject('createGlobalBlockingStore')
@observer
class BlockUserGloballyMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, createGlobalBlockingStore} = this.props;

        if (onClick) {
            onClick();
        }

        createGlobalBlockingStore.setCreateGlobalBlockingDialogOpened(true);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <BlockIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('blockUserGlobally')}
            </ListItemText>
        </MenuItem>
    }
}

BlockUserGloballyMenuItem.propTypes = {
    l: PropTypes.func,
    onClick: PropTypes.func,
    createGlobalBlockingStore: PropTypes.object
};

export default BlockUserGloballyMenuItem;
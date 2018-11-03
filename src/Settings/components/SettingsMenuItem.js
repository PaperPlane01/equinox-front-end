import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import {withLocale} from "../../localization";

@withLocale
@inject('settingsDialogStore')
@observer
class SettingsMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, settingsDialogStore} = this.props;

        if (onClick) {
            onClick();
        }

        settingsDialogStore.setOpen(true);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <SettingsIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('settings')}
            </ListItemText>
        </MenuItem>
    }
}

SettingsMenuItem.propTypes = {
    settingsDialogStore: PropTypes.object,
    l: PropTypes.func,
    onClick: PropTypes.func
};

export default SettingsMenuItem;
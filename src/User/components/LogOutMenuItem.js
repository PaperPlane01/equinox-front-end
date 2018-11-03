import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitIcon from '@material-ui/icons/ExitToApp';
import {withLocale} from "../../localization";

@withLocale
@inject('authStore')
@observer
class LogOutMenuItem extends React.Component {
    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }

        this.props.authStore.doLogOut();
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <ExitIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('logOut')}
            </ListItemText>
        </MenuItem>
    }
}

LogOutMenuItem.propTypes = {
    authStore: PropTypes.object,
    l: PropTypes.func,
    onClick: PropTypes.func
};

export default LogOutMenuItem;
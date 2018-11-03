import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import {withLocale} from "../../localization";

@withLocale
@inject('authStore')
@observer
class LoginMenuItem extends React.Component {
    handleClick = () => {
        const {authStore, onClick} = this.props;

        if (onClick) {
            onClick();
        }

        authStore.setLoginDialogOpen(true)
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <PersonIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('logIn')}
            </ListItemText>
        </MenuItem>
    }
}

LoginMenuItem.propTypes = {
    l: PropTypes.func,
    authStore: PropTypes.object,
    onClick: PropTypes.func
};

export default LoginMenuItem;
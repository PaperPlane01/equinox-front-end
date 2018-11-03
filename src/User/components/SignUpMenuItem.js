import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {withLocale} from "../../localization";

@withLocale
@inject('signUpStore')
@observer
class SignUpMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, signUpStore} = this.props;

        if (onClick) {
            onClick();
        }

        signUpStore.setSignUpDialogOpen(true);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <PersonAddIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('signUp')}
            </ListItemText>
        </MenuItem>
    }
}

SignUpMenuItem.propTypes = {
    l: PropTypes.func,
    signUpStore: PropTypes.object,
    onClick: PropTypes.func
};

export default SignUpMenuItem;
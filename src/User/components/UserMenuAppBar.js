import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListSubheader from '@material-ui/core/ListSubheader';
import LoginDialog from './LoginDialog';
import LoginMenuItem from './LoginMenuItem';
import SignUpDialog from './SignUpDialog';
import SignUpMenuItem from './SignUpMenuItem';
import LogOutMenuItem from './LogOutMenuItem';
import MyProfileMenuItem from '../Profile/components/MyProfileMenuItem';
import {SettingsDialog, SettingsMenuItem} from '../../Settings';
import {withLocale} from "../../localization";

@withLocale
@inject('authStore')
@observer
class UserMenuAppBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorElement: null
        }
    }

    openMenu = event => {
        this.setState({
            anchorElement: event.currentTarget
        })
    };

    closeMenu = () => {
        this.setState({anchorElement: null});
    };

    renderMenuItemsForLoggedInUser = () => {
        const {authStore, l} = this.props;
        const {currentUser} = authStore;
        return <React.Fragment>
            {currentUser && <ListSubheader>
                {l('welcome', {username: currentUser.displayedName})}
            </ListSubheader>}
            <MyProfileMenuItem userId={currentUser && currentUser.id}
                               onClick={this.closeMenu}
            />
            <LogOutMenuItem onClick={this.closeMenu}/>
            <SettingsMenuItem onClick={this.closeMenu}/>
        </React.Fragment>
    };

    renderMenuItemsForNotLoggedInUser = () => {
        return <React.Fragment>
            <LoginMenuItem onClick={this.closeMenu}/>
            <SignUpMenuItem onClick={this.closeMenu}/>
            <SettingsMenuItem onClick={this.closeMenu}/>
        </React.Fragment>
    };

    render() {
        const {anchorElement} = this.state;
        const {authStore} = this.props;

        return <div>
            <IconButton color="inherit"
                    onClick={this.openMenu}
            >
                <AccountCircleIcon/>
            </IconButton>
            <Menu id="userMenu"
                  anchorEl={anchorElement}
                  open={Boolean(anchorElement)}
                  onClose={this.closeMenu}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
            >
                {authStore.loggedIn
                    ? this.renderMenuItemsForLoggedInUser()
                    : this.renderMenuItemsForNotLoggedInUser()}
            </Menu>
            <SettingsDialog/>
            <LoginDialog/>
            <SignUpDialog/>
        </div>
    }
}

UserMenuAppBar.propTypes = {
    authStore: PropTypes.object,
    l: PropTypes.func
};

export default UserMenuAppBar;
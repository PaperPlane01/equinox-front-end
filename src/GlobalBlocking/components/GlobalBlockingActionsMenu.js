import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditGlobalBlockingMenuItem from './EditGlobalBlockingMenuItem';
import UpdateGlobalBlockingDialog from './UpdateGlobalBlockingDialog';
import UnblockUserMenuItem from './UnblockUserMenuItem';
import UnblockUserDialog from './UnblockUserDialog';
import {canUnblockUser, canUpdateGlobalBlocking} from "../permissions";

@inject('authStore')
@observer
class GlobalBlockingActionsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorElement: null
        }
    }

    openMenu = event => {
        this.setState({
            anchorElement: event.target
        })
    };

    closeMenu = () => {
        this.setState({
            anchorElement: null
        })
    };

    render() {
        const {authStore, globalBlocking} = this.props
        const {anchorElement} = this.state;

        const menuId = `globalBlockingMenu-${globalBlocking.id}`;
        const _canUpdateGlobalBlocking = canUpdateGlobalBlocking(authStore.currentUser);
        const _canDeleteGlobalBlocking = canUnblockUser(authStore.currentUser);
        const items = [];

        _canUpdateGlobalBlocking && items.push(<EditGlobalBlockingMenuItem globalBlockingId={globalBlocking.id}
                                                                           onClick={this.closeMenu}
        />);
        _canDeleteGlobalBlocking && items.push(<UnblockUserMenuItem globalBlockingId={globalBlocking.id}
                                                                    onClick={this.closeMenu}
        />);

        if (items.length !== 0) {
            return <div>
                <IconButton onClick={this.openMenu}>
                    <MoreVertIcon/>
                </IconButton>
                <Menu id={menuId}
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
                    {items}
                </Menu>
                {_canUpdateGlobalBlocking && <UpdateGlobalBlockingDialog globalBlockingId={globalBlocking.id}/>}
                {_canDeleteGlobalBlocking && <UnblockUserDialog globalBlocking={globalBlocking}/>}
            </div>
        } else {
            return null;
        }
    }
}

GlobalBlockingActionsMenu.propTypes = {
    authStore: PropTypes.object,
    globalBlocking: PropTypes.object
};

export default GlobalBlockingActionsMenu;
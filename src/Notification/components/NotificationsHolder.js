import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import NotificationItem from './NotificationItem';
import {withLocale} from "../../localization";

@withLocale
@inject('notificationsHolderStore')
@inject('authStore')
@observer
class NotificationsHolder extends React.Component {
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
        this.setState({
            anchorElement: null
        });
        this.props.notificationsHolderStore.markNotificationsAsRead();
    };

    render() {
        const {notificationsHolderStore, authStore, l} = this.props;
        const {unreadNotifications, readNotifications, notifications, pending, error} = notificationsHolderStore;
        const {anchorElement} = this.state;

        if (!authStore.currentUser) {
            return null;
        }

        const menuListItems = [];

        const unreadNotificationsItem = unreadNotifications.length !== 0 ? (<div>
            <Typography style={{
                margin: '15px'
            }}
                        variant="subheading">
                {l('unreadNotifications')}
            </Typography>
            {unreadNotifications.map(notification => (
                <NotificationItem notification={notification}
                                  onClick={this.closeMenu}
                />
            ))}
        </div>) : null;

        const readNotificationsItem = (<div>
            <Typography style={{
                margin: '15px'
            }}
                        variant="subheading">
                {l('readNotifications')}
            </Typography>
            {readNotifications.map(notification => (
                <NotificationItem notification={notification}
                                  onClick={this.closeMenu}
                />
            ))}
        </div>);

        menuListItems.push(unreadNotificationsItem);
        unreadNotificationsItem && menuListItems.push(<Divider/>);
        menuListItems.push(readNotificationsItem);

        return <div>
            <IconButton color="inherit"
                        onClick={this.openMenu}
            >
                {unreadNotifications.length === 0
                    ? <NotificationsIcon/>
                    : <Badge badgeContent={unreadNotifications.length}
                             color="secondary">
                        <NotificationsActiveIcon/>
                    </Badge>
                }
            </IconButton>
            <Menu id="notificationsMenu"
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
                  PaperProps={{
                      style: {
                          maxWidth: '500px',
                      },
                  }}
            >
                {notifications.length === 0
                    ? <CardContent>
                        <Typography variant="subheading">
                            {l('noNotifications')}
                        </Typography>
                    </CardContent>
                    : menuListItems
                }
                <Button variant="outlined"
                        color="secondary"
                        onClick={this.closeMenu}
                        style={{
                            margin: '10px'
                        }}
                >
                    {l('close')}
                </Button>
            </Menu>
        </div>
    }
}

NotificationsHolder.propTypes = {
    notificationsHolderStore: PropTypes.object,
    l: PropTypes.func
};

export default NotificationsHolder;
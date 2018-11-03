import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import SwipableDrawer from '@material-ui/core/SwipeableDrawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import HomeIcon from '@material-ui/icons/Home';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SubscriptionDrawerItem from './SubscriptionDrawerItem';
import {withLocale} from "../../localization";
import views from '../../router-config';

@withLocale
@inject('appBarStore')
@inject('currentUserSubscriptionsStore')
@inject('authStore')
@inject('store')
@observer
class Drawer extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const {authStore, currentUserSubscriptionsStore, appBarStore, store, l} = this.props;
        const {loggedIn, currentUser} = authStore;
        const {subscriptions, pending} = currentUserSubscriptionsStore;
        const {drawerOpened, subscriptionsOpened} = appBarStore;

        const subscriptionsMenuItem = loggedIn && (<div>
            <ListItem button
                      onClick={() => appBarStore.setSubscriptionsOpen(!subscriptionsOpened)}
            >
                <ListItemIcon>
                    <SubscriptionsIcon/>
                </ListItemIcon>
                <ListItemText>
                    {l('subscriptions')}
                </ListItemText>
                {subscriptionsOpened ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </ListItem>
            <Collapse in={subscriptionsOpened}
                      timeout="auto"
                      unmountOnExit
            >
                <List component="div"
                      disablePadding
                >
                    {(subscriptions.length === 0 && pending) && <CircularProgress size={20}
                                                 color="primary"
                                                 style={{
                                                     marginLeft: 'calc(50% - 10px)'
                                                 }}
                    />}
                    {(subscriptions.length === 0 && !pending)
                        ? <ListItem>
                            <ListItemText>
                                {l('noSubscriptions')}
                            </ListItemText>
                        </ListItem>
                        : subscriptions.map(subscription => (<SubscriptionDrawerItem blogName={subscription.blog.name}
                                                                                     blogId={subscription.blog.id}
                                                                                     blogLetterAvatarColor={subscription.blog.letterAvatarColor}
                                                                                     blogAvatarUri={subscription.blog.avatarUri}
                        />))}
                </List>
            </Collapse>
        </div>);

        return <SwipableDrawer open={drawerOpened}
                               onOpen={() => appBarStore.setDrawerOpened(true)}
                               onClose={() => appBarStore.setDrawerOpened(false)}
                               anchor="left"
        >
            <List>
                <Link view={views.home}
                      store={store}
                      style={{
                          textDecoration: 'none'
                      }}
                >
                    <ListItem>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItem>
                            <ListItemText>
                                {l('home')}
                            </ListItemText>
                        </ListItem>
                    </ListItem>
                </Link>
                <Divider/>
                {subscriptionsMenuItem}
            </List>
        </SwipableDrawer>
    }
}

Drawer.propTypes = {
    authStore: PropTypes.object,
    currentUserSubscriptionsStore: PropTypes.object,
    appBarStore: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func,
    title: PropTypes.string
};

export default Drawer;
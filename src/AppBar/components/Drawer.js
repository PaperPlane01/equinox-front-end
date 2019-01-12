import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import SwipableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CurrentUserSubscriptionsDrawerItem from './CurrentUserSubscriptionsDrawerItem';
import FeedDrawerItem from './FeedDrawerItem';
import CurrentUserBlogsDrawerItem from './CurrentUserBlogsDrawerItem';
import HomeDrawerItem from './HomeDrawerItem';
import GlobalBlockingsDrawerItem from "./GlobalBlockingsDrawerItem";
import {canSeeGlobalBlockings} from "../../GlobalBlocking/permissions";

@inject('appBarStore')
@inject('authStore')
@observer
class Drawer extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const {authStore, appBarStore} = this.props;
        const {loggedIn, currentUser} = authStore;
        const {drawerOpened} = appBarStore;

        const subscriptionsItem = loggedIn && (<CurrentUserSubscriptionsDrawerItem/>);
        const feedItem = loggedIn && (<FeedDrawerItem/>);
        const blogsItem = loggedIn && (<CurrentUserBlogsDrawerItem/>);
        const globalBlockingsItem = canSeeGlobalBlockings(currentUser) && (<GlobalBlockingsDrawerItem/>);

        return <SwipableDrawer open={drawerOpened}
                               onOpen={() => appBarStore.setDrawerOpened(true)}
                               onClose={() => appBarStore.setDrawerOpened(false)}
                               anchor="left"
        >
            <List>
                <HomeDrawerItem/>
                <Divider/>
                {feedItem}
                {subscriptionsItem}
                {blogsItem}
                {globalBlockingsItem && <div>
                    <Divider/>
                    {globalBlockingsItem}
                </div>}
            </List>
        </SwipableDrawer>
    }
}

Drawer.propTypes = {
    authStore: PropTypes.object,
    appBarStore: PropTypes.object,
    title: PropTypes.string
};

export default Drawer;
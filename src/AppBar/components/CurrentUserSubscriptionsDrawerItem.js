import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import BlogList from "./BlogList";
import {withLocale} from "../../localization";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";

@withLocale
@inject('appBarStore')
@inject('currentUserSubscriptionsStore')
@observer
class CurrentUserSubscriptionsDrawerItem extends React.Component {
    render() {
        const {l, appBarStore, currentUserSubscriptionsStore} = this.props;
        const {subscriptions, pending} = currentUserSubscriptionsStore;
        const {subscriptionsOpened} = appBarStore;

        return <div>
            <ListItem button
                      onClick={() => appBarStore.setSubscriptionsOpened(!subscriptionsOpened)}
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
                <BlogList pending={pending}
                          blogs={subscriptions.map(subscription => subscription.blog)}
                          emptyLabel={l('noSubscriptions')}
                />
            </Collapse>
        </div>
    }
}

CurrentUserSubscriptionsDrawerItem.propTypes = {
    currentUserSubscriptionsStore: PropTypes.object,
    appBarStore: PropTypes.object,
    l: PropTypes.func
};

export default CurrentUserSubscriptionsDrawerItem;
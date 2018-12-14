import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinkToBlogDrawerItem from './LinkToBlogDrawerItem';
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
                        : subscriptions.map(subscription =>
                            (<LinkToBlogDrawerItem blogName={subscription.blog.name}
                                                   blogId={subscription.blog.id}
                                                   blogLetterAvatarColor={subscription.blog.letterAvatarColor}
                                                   blogAvatarUri={subscription.blog.avatarUri}
                            />))
                    }
                </List>
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
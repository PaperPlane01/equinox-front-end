import React from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import {Link} from 'mobx-router';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GlobalBlockingActionsMenu from './GlobalBlockingActionsMenu';
import views from '../../router-config';
import Avatar from '../../Avatar';
import {withLocale} from "../../localization";

@withLocale
@inject('store')
class GlobalBlockingsListItem extends React.Component {
    render() {
        const {globalBlocking, store, l} = this.props;

        return <ListItem>
            <Avatar width={60}
                    height={60}
                    avatarColor={globalBlocking.blockedUser.letterAvatarColor}
                    avatarLetter={globalBlocking.blockedUser.displayedName[0]}
                    avatarUri={globalBlocking.blockedUser.avatarUri}
            />
            <ListItemText>
                <Link store={store}
                      view={views.userProfile}
                      params={{id: globalBlocking.blockedUser.id}}
                      style={{textDecoration: 'none'}}
                >
                    {globalBlocking.blockedUser.displayedName}
                </Link>, {l('reason')}: {globalBlocking.reason}, {l('endDate')}: {moment(globalBlocking.endDate).format("DD-MM-YYYY HH:mm:ss")}
            </ListItemText>
            <GlobalBlockingActionsMenu globalBlocking={globalBlocking}/>
        </ListItem>
    }
}

GlobalBlockingsListItem.propTypes = {
    globalBlocking: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func
};

export default GlobalBlockingsListItem;
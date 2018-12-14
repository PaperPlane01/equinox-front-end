import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import {withLocale} from "../../localization";
import views from '../../router-config';

@withLocale
@inject('store')
@inject('appBarStore')
@observer
class FeedDrawerItem extends React.Component {
    render() {
        const {l, appBarStore, store} = this.props;

        return <Link view={views.feed}
                     store={store}
                     style={{textDecoration: 'none'}}
        >
            <ListItem onClick={() => appBarStore.setDrawerOpened(false)}>
                <ListItemIcon>
                    <RssFeedIcon/>
                </ListItemIcon>
                <ListItemText>
                    {l('feed')}
                </ListItemText>
            </ListItem>
        </Link>
    }
}

FeedDrawerItem.propTypes = {
    appBarStore: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func
};

export default FeedDrawerItem;
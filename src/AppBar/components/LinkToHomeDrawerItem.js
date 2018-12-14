import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import {withLocale} from "../../localization";
import views from '../../router-config';
import List from "@material-ui/core/List/List";

@withLocale
@inject('store')
@inject('appBarStore')
@observer
class LinkToHomeDrawerItem extends React.Component {
    render() {
        const {store, appBarStore, l} = this.props;

        return  <Link view={views.home}
                      store={store}
                      style={{
                          textDecoration: 'none'
                      }}
        >
            <ListItem onClick={() => appBarStore.setDrawerOpened(false)}>
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
    }
}

LinkToHomeDrawerItem.propTypes = {
    appBarStore: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func
};

export default LinkToHomeDrawerItem;
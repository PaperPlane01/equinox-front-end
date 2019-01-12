import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import closeDrawer from './closeDrawer';
import {withLocale} from "../../localization";
import views from '../../router-config';

@withLocale
@closeDrawer
@inject('store')
@observer
class HomeDrawerItem extends React.Component {
    render() {
        const {store, closeDrawer, l} = this.props;

        return  <Link view={views.home}
                      store={store}
                      style={{
                          textDecoration: 'none'
                      }}
        >
            <ListItem onClick={closeDrawer}>
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

HomeDrawerItem.propTypes = {
    store: PropTypes.object,
    l: PropTypes.func,
    closeDrawer: PropTypes.func
};

export default HomeDrawerItem;
import React from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import {Link} from 'mobx-router';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import closeDrawer from './closeDrawer';
import {withLocale} from "../../localization";
import views from '../../router-config';

@withLocale
@closeDrawer
@inject('store')
class GlobalBlockingsDrawerItem extends React.Component {
    render() {
        const {store, closeDrawer, l} = this.props;

        return <Link view={views.globalBlockings}
                     store={store}
                     style={{textDecoration: 'none'}}
        >
            <MenuItem onClick={closeDrawer}>
                <ListItemIcon>
                    <SupervisedUserCircleIcon/>
                </ListItemIcon>
                <ListItemText>
                    {l('globalBlockings')}
                </ListItemText>
            </MenuItem>
        </Link>
    }
}

GlobalBlockingsDrawerItem.propTypes = {
    store: PropTypes.object,
    closeDrawer: PropTypes.func,
    l: PropTypes.func
};

export default GlobalBlockingsDrawerItem;
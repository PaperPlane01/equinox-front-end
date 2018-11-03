import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'mobx-router';
import {withLocale} from "../../../localization/index";
import views from '../../../router-config/index';

@withLocale
@inject('store')
@observer
class EditProfileMenuItem extends React.Component {
    render() {
        const {l, store} = this.props;

        return <Link view={views.editProfile}
                     store={store}
                     style={{
                         'text-decoration': 'none'
                     }}
        >
            <MenuItem>
                <ListItemIcon>
                    <EditIcon/>
                </ListItemIcon>
                <ListItemText>
                    {l('editProfile')}
                </ListItemText>
            </MenuItem>
        </Link>
    }
}

EditProfileMenuItem.propTypes = {
    l: PropTypes.func,
    store: PropTypes.object
};

export default EditProfileMenuItem;
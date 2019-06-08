import React from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import {Link} from 'mobx-router';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import {withLocale} from "../../localization";
import views from '../../router-config';

@withLocale
@inject('store')
class MyProfileMenuItem extends React.Component {
    handleClick = () => {
        const {onClick} = this.props;

        if (onClick) {
            onClick();
        }
    };

    render() {
        const {l, userId, store} = this.props;

        return <Link style={{
            'text-decoration': 'none'
        }}
                     view={views.userProfile}
                     params={{id: userId}}
                     store={store}
        >
            <MenuItem onClick={this.handleClick}>
                <ListItemIcon>
                    <PersonIcon/>
                </ListItemIcon>
                <ListItemText>
                    {l('myProfile')}
                </ListItemText>
            </MenuItem>
        </Link>
    }
}

MyProfileMenuItem.propTypes = {
    l: PropTypes.func,
    userId: PropTypes.number,
    onClick: PropTypes.func,
    store: PropTypes.object
};

export default MyProfileMenuItem;
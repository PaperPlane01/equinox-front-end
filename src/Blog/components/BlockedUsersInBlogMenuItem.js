import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BlockIcon from '@material-ui/icons/Block';
import {withLocale} from "../../localization";
import views from '../../router-config';

@withLocale
@inject('store')
@observer
class BlockedUsersInBlogMenuItem extends React.Component {
    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    render() {
        const {l, store, blogId} = this.props;

        return <Link style={{textDecoration: 'none'}}
                     view={views.blogBlockings}
                     params={{blogId}}
                     store={store}
        >
            <MenuItem onClick={this.handleClick}>
                <ListItemIcon>
                    <BlockIcon/>
                </ListItemIcon>
                <ListItemText>
                    {l('blockedUsers')}
                </ListItemText>
            </MenuItem>
        </Link>
    }
}

BlockedUsersInBlogMenuItem.propTypes = {
    l: PropTypes.func,
    store: PropTypes.object,
    blogId: PropTypes.number,
    onClick: PropTypes.func
};

export default BlockedUsersInBlogMenuItem;
import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BlockIcon from '@material-ui/icons/Block';
import {withLocale} from "../../localization";

@withLocale
@inject('createBlogBlockingStore')
@observer
class BlockUserInBlogMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, createBlogBlockingStore, blockedUserId} = this.props;

        if (onClick) {
            onClick();
        }

        createBlogBlockingStore.setCreateBlogBlockingDialogOpened(true);
        createBlogBlockingStore.setBlockedUserId(blockedUserId);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <BlockIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('blockUserInBlog')}
            </ListItemText>
        </MenuItem>
    }
}

BlockUserInBlogMenuItem.propTypes = {
    onClick: PropTypes.func,
    blockedUserId: PropTypes.number,
    createBlogBlockingStore: PropTypes.object,
    l: PropTypes.func
};

export default BlockUserInBlogMenuItem;
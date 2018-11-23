import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {withLocale} from "../../../localization";

@withLocale
@inject('blogBlockingsStore')
@observer
class UnblockUserMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, blogBlockingId, blogBlockingsStore} = this.props;

        if (onClick) {
            onClick();
        }

        blogBlockingsStore.deleteBlogBlocking(blogBlockingId);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <VerifiedUserIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('unblockUser')}
            </ListItemText>
        </MenuItem>
    }
}

UnblockUserMenuItem.propTypes = {
    blogBlockingId: PropTypes.number,
    l: PropTypes.number,
    onClick: PropTypes.func,
    blogBlockingsStore: PropTypes.object
};

export default UnblockUserMenuItem;

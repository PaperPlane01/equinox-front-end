import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestoreIcon from '@material-ui/icons/Restore';
import {withLocale} from "../../localization";

@withLocale
@inject('restoreCommentStore')
@observer
class RestoreCommentMenuItem extends React.Component {
    handleClick = () => {
        const {commentId, restoreCommentStore, onClick} = this.props;

        if (onClick) {
            onClick();
        }

        restoreCommentStore.restoreComment(commentId);
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <RestoreIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('restore')}
            </ListItemText>
        </MenuItem>
    }
}

RestoreCommentMenuItem.propTypes = {
    commentId: PropTypes.number,
    restoreCommentStore: PropTypes.object,
    onClick: PropTypes.func,
    l: PropTypes.func
};

export default RestoreCommentMenuItem;
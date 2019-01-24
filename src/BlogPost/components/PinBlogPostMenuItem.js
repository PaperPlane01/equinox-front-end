import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PinIcon from '../../icons/PinIcon';
import {withLocale} from "../../localization";

@withLocale
@inject('pinBlogPostStore')
@observer
class PinBlogPostMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, blogPostId, pinBlogPostStore} = this.props;

        if (onClick) {
            onClick();
        }

        pinBlogPostStore.setBlogPostId(blogPostId);
        pinBlogPostStore.pinBlogPost();
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <PinIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('pin')}
            </ListItemText>
        </MenuItem>
    }
}

PinBlogPostMenuItem.propTypes = {
    blogPostId: PropTypes.number,
    onClick: PropTypes.func,
    pinBlogPostStore: PropTypes.object,
    l: PropTypes.func,
};

export default PinBlogPostMenuItem;
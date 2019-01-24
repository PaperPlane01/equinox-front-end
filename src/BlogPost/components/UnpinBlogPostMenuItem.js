import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UnpinIcon from '../../icons/UnpinIcon';
import {withLocale} from "../../localization";

@withLocale
@inject('unpinBlogPostStore')
@observer
class UnpinBlogPostMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, blogPostId, unpinBlogPostStore} = this.props;

        if (onClick) {
            onClick();
        }

        unpinBlogPostStore.setBlogPostId(blogPostId);
        unpinBlogPostStore.unpinBlogPost();
    };

    render() {
        const {l} = this.props;

        return <MenuItem onClick={this.handleClick}>
            <ListItemIcon>
                <UnpinIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('unpin')}
            </ListItemText>
        </MenuItem>
    }
}

UnpinBlogPostMenuItem.propTypes = {
    blogPostId: PropTypes.number,
    onClick: PropTypes.func,
    unpinBlogPostStore: PropTypes.object,
    l: PropTypes.func,
};

export default UnpinBlogPostMenuItem;
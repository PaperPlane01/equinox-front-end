import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import views from '../../router-config';
import {withLocale} from "../../localization";

@withLocale
@inject('store')
@observer
class EditBlogPostMenuItem extends React.Component {
    handleClick = () => {
        const {onClick} = this.props;
        if (onClick) {
            onClick();
        }
    };

    render() {
        const {l, store, blogPostId} = this.props;

        return <Link style={{
            'text-decoration': 'none'
        }}
                     view={views.editBlogPost}
                     params={{id: blogPostId}}
                     store={store}>
            <MenuItem onClick={this.handleClick}>
                <ListItemIcon>
                    <EditIcon/>
                </ListItemIcon>
                <ListItemText>
                    {l('edit')}
                </ListItemText>
            </MenuItem>
        </Link>
    }
}

EditBlogPostMenuItem.propTypes = {
    store: PropTypes.object,
    blogPostId: PropTypes.number,
    onClick: PropTypes.func,
    l: PropTypes.func
};

export default EditBlogPostMenuItem;
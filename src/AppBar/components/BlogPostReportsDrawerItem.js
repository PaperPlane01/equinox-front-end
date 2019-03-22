import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import {Link} from "mobx-router";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import closeDrawer from './closeDrawer';
import views from '../../router-config';
import {withLocale} from "../../localization";

@closeDrawer
@withLocale
@inject('store')
@observer
class BlogPostReportsDrawerItem extends React.Component {
    render() {
        const {store, l, closeDrawer} = this.props;

        return (
            <Link view={views.blogPostReports}
                  style={{textDecoration: 'none'}}
                  store={store}
            >
                <ListItem onClick={closeDrawer}>
                    <ListItemIcon>
                        <ViewAgendaIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        {l('onBlogPosts')}
                    </ListItemText>
                </ListItem>
            </Link>
        )
    }
}

BlogPostReportsDrawerItem.propTypes = {
    store: PropTypes.object,
    l: PropTypes.func,
    closeDrawer: PropTypes.func
};

export default BlogPostReportsDrawerItem;

import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ViewListIcon from '@material-ui/icons/ViewList';
import BlogList from "./BlogList";
import {withLocale} from "../../localization";

@withLocale
@inject('currentUserBlogsStore')
@inject('appBarStore')
@observer
class CurrentUserBlogsDrawerItem extends React.Component {
    render() {
        const {l, appBarStore, currentUserBlogsStore} = this.props;
        const {blogs, pending} = currentUserBlogsStore;
        const {blogsOpened} = appBarStore;

        return <div>
            <ListItem button
                      onClick={() => appBarStore.setBlogsOpened(!blogsOpened)}
            >
                <ListItemIcon>
                    <ViewListIcon/>
                </ListItemIcon>
                <ListItemText>
                    {l('myBlogs')}
                </ListItemText>
                {blogsOpened ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </ListItem>
            <Collapse in={blogsOpened}
                      timeout="auto"
                      unmountOnExit
            >
                <BlogList pending={pending}
                          blogs={blogs}
                          emptyLabel={l('youDontHaveAnyBlogs')}
                />
            </Collapse>
        </div>
    }
}

CurrentUserBlogsDrawerItem.propTypes = {
    currentUserBlogsStore: PropTypes.object,
    appBarStore: PropTypes.object,
    l: PropTypes.func
};

export default CurrentUserBlogsDrawerItem;

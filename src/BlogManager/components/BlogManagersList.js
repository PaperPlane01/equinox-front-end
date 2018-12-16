import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import BlogManagersListItem from './BlogManagersListItem';
import BlogManagerUsernameInput from './BlogManagerUsernameInput';
import LoadMoreBlogManagersButton from './LoadMoreBlogManagersButton';
import views from '../../router-config';
import {withLocale} from "../../localization";

@withLocale
@inject('blogManagersStore')
@inject('store')
@observer
class BlogManagersList extends React.Component {
    render() {
        const {blogManagersStore, store, l} = this.props;
        const {blog, managers, username, pending} = blogManagersStore;

        return <Card>
            {blog && <Link store={store}
                           view={views.blog}
                           params={{id: blog.id}}
                           style={{textDecoration: 'none'}}
            >
                <CardHeader title={l('blogManagers_withBlogName', {blogName: blog.name})}/>
            </Link>}
            <CardContent>
                <BlogManagerUsernameInput/>
                <div>
                    <List>
                        {managers.map(manager => (<BlogManagersListItem blogManager={manager}/>))}
                    </List>
                    {pending && !username && <CircularProgress color="primary"
                                                               size={50}
                                                               style={{
                                                                   marginLeft: 'calc(50% - 50px)',
                                                               }}/>}
                </div>
                <LoadMoreBlogManagersButton/>
            </CardContent>
        </Card>
    }
}

BlogManagersList.propTypes = {
    blogManagersStore: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func
};

export default BlogManagersList;
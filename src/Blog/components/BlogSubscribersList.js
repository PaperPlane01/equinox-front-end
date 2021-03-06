import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import BlogSubscribersListItem from './BlogSubscribersListItem';
import LoadMoreSubscribersButton from './LoadMoreSubscribersButton';
import BlogSubscribersUsernameInput from './BlogSubscribersUsernameInput';
import {withLocale} from "../../localization";
import views from '../../router-config';

@withLocale
@inject('store')
@inject('blogSubscribersListStore')
@observer
class BlogSubscribersList extends React.Component {
    render() {
        const {l, blogSubscribersListStore, store} = this.props;
        const {subscriptions, fetchingSubscriptions, blog} = blogSubscribersListStore;

        return <Card>
            {blog && <Link style={{textDecoration: 'none'}}
                               store={store}
                               view={views.blog}
                               params={{id: blog.id}}>
                <CardHeader title={l('subscribersOfBlog_withBlogName', {blogName: blog.name})}/>
            </Link>}
            <CardContent>
                <BlogSubscribersUsernameInput/>
                <div>
                    <List>
                        {subscriptions.map(subscription => (<BlogSubscribersListItem subscription={subscription}/>))}
                    </List>
                    {fetchingSubscriptions
                    && !blogSubscribersListStore.username && <CircularProgress color="primary"
                                                                size={50}
                                                                style={{
                                                                    marginLeft: 'calc(50% - 50px)',
                                                                }}
                    />}
                </div>
                <LoadMoreSubscribersButton/>
            </CardContent>
        </Card>
    }
}

BlogSubscribersList.propTypes = {
    blogSubscribersListStore: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func
};

export default BlogSubscribersList;
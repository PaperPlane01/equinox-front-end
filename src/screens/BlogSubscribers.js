import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '../AppBar';
import {BlogSubscribersList} from "../Blog";
import {withLocale} from "../localization";

@withLocale
@inject('blogSubscribersListStore')
@observer
class BlogSubscribers extends React.Component {
    renderContent = () => {
        const {blogSubscribersListStore, l} = this.props;
        const {error} = blogSubscribersListStore;

        if (error) {
            return error.status === 404 || error.status === 400
                ? <Typography variant="headline">
                    {l('blogNotFound')}
                </Typography>
                : <Typography variant="headline">
                    {l('errorWhenAttemptedToFetchSubscribers', {errorStatus: error.status})}
                </Typography>
        }

        return <BlogSubscribersList/>
    };

    render() {
        const {blogSubscribersListStore, l} = this.props;
        const {blog} = blogSubscribersListStore;
        const appBarTitle = blog
            ? `${l('subscribersOfBlog_withBlogName', {blogName: blog.name})}`
            : `${l('subscribersOfBlog')}`;

        return <Grid container>
            <Grid item xs={12}>
                <AppBar title={appBarTitle}/>
            </Grid>
            <Grid item xs={1} lg={2}/>
            <Grid item xs={10} lg={8}>
                <div style={{
                    marginTop: '16px',
                    width: '100%'
                }}>
                    {this.renderContent()}
                </div>
            </Grid>
        </Grid>
    }
}

BlogSubscribers.propTypes = {
    blogSubscribersListStore: PropTypes.object,
    l: PropTypes.func
};

export default BlogSubscribers;

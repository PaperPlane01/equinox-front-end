import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import {BlogDescription, BlogSubscribersBlock, SubscribeToBlogButton, UnsubscribeFromBlogButton,
    BlogManagersBlock} from "../Blog";
import {BlogPostList, CreateBlogPostForm, LoadMoreBlogPostsButton} from "../BlogPost";
import AppBar from '../AppBar';
import {withLocale} from "../localization";
import StandardLayout from '../StandardLayout';
import {canCreateBlogPost, canSeeBlogManagers} from "../Blog/permissions";

@withLocale
@inject('blogStore')
@inject('authStore')
@observer
class Blog extends React.Component {
    renderContent = () => {
        const {blogStore, authStore, l} = this.props;
        const {pending, error, blog} = blogStore;
        const {currentUser} = authStore;

        if (pending) {
            return <CircularProgress color="primary"
                                     size={100}
                                     style={{
                                         marginLeft: 'calc(50% - 50px)',
                                     }}
            />
        }

        if (error) {
            return <Typography variant="headline">
                {error.status === 404
                    ? l('blogNotFound')
                    : l('errorWhenAttemptedToFetchBlog', {errorStatus: error.status})}
            </Typography>
        }

        if (blog) {
            return <div>
                <Hidden mdUp>
                    <Grid container spacing={16}>
                        <Grid item xs={12} lg={9}>
                            <BlogDescription/>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <BlogSubscribersBlock/>
                                </Grid>
                                {canSeeBlogManagers(currentUser, blog) && <Grid item xs={12}>
                                    <BlogManagersBlock/>
                                </Grid>}
                                {authStore.loggedIn ? !blog.currentUserSubscribed ? <Grid item xs={12}>
                                    <SubscribeToBlogButton/>
                                </Grid> : <Grid item xs={12}>
                                    <UnsubscribeFromBlogButton/>
                                </Grid> : ''}
                            </Grid>
                        </Grid>
                        {canCreateBlogPost(currentUser, blog.id) && <Grid item xs={12} lg={3}>
                            <CreateBlogPostForm/>
                        </Grid>}
                        <Grid item xs={12} lg={9} >
                            <BlogPostList/>
                        </Grid>
                        <Grid item xs={12} lg={9} alignContent="center">
                            <LoadMoreBlogPostsButton source="blogPostListStore"/>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden smDown>
                    <Grid container spacing={16}>
                        <Grid item xs={12} lg={9}>
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <BlogDescription/>
                                </Grid>
                                {canCreateBlogPost(currentUser, blog.id) && <Grid item xs={12}>
                                    <CreateBlogPostForm/>
                                </Grid>}
                                <Grid item xs={12}>
                                    <BlogPostList/>
                                </Grid>
                                <Grid item xs={12} alignContent="center">
                                    <LoadMoreBlogPostsButton source="blogPostListStore"/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={3} >
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <BlogSubscribersBlock/>
                                </Grid>
                                {canSeeBlogManagers(currentUser, blog) && <Grid item xs={12}>
                                    <BlogManagersBlock/>
                                </Grid>}
                                {authStore.loggedIn ? !blog.currentUserSubscribed ? <Grid item xs={12}>
                                    <SubscribeToBlogButton/>
                                </Grid> : <Grid item xs={12}>
                                    <UnsubscribeFromBlogButton/>
                                </Grid> : ''}
                            </Grid>
                        </Grid>
                    </Grid>
                </Hidden>
            </div>
        }
    };

    render() {
        const {blogStore} = this.props;

        return <Grid container>
            <Grid item xs={12}>
                <AppBar title={blogStore.blog && blogStore.blog.name}/>
            </Grid>
           <StandardLayout>
               {this.renderContent()}
           </StandardLayout>
        </Grid>
    }
}

Blog.propTypes = {
    blogStore: PropTypes.object,
    authStore: PropTypes.object
};

export default withWidth()(Blog);
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {observer, inject} from 'mobx-react';
import AppBar from '../AppBar';
import {withLocale} from "../localization";
import Typography from "@material-ui/core/Typography/Typography";
import {BlockedUsersList, LoadMoreBlogBlockingsButton, canSeeUsersBlockedInBlog} from "../BlogBlocking";

@withLocale
@inject('authStore')
@inject('blogBlockingsStore')
@observer
class BlogBlockings extends React.Component {
    renderContent = () => {
        const {blogBlockingsStore, l, authStore} = this.props;
        const {fetchingBlog, blogError, blockingsError} = blogBlockingsStore;

        if (!canSeeUsersBlockedInBlog(authStore.currentUser, blogBlockingsStore.blogId)) {
            return <Typography variant="headline">
                {l('accessToPageDenied')}
            </Typography>
        }

        if (fetchingBlog) {
            return <CircularProgress color="primary"
                                     size={100}
                                     style={{
                                         marginLeft: 'calc(50% - 50px)',
                                     }}
            />
        }

        if (blogError) {
            return blogError.status === 404 || blogError.status === 400
                ?  <Typography variant="headline">
                    {l('blogNotFound')}
                </Typography>
                : <Typography variant="headline">
                    {l('errorWhenAttemptedToFetchBlogBlockings', {errorStatus: blogError.status})}
                </Typography>
        }

        if (blockingsError) {
            return blockingsError.status === 404 || blockingsError.status === 400
                ?  <Typography variant="headline">
                    {l('blogNotFound')}
                </Typography>
                : <Typography variant="headline">
                    {l('errorWhenAttemptedToFetchBlogBlockings', {errorStatus: blockingsError.status})}
                </Typography>
        }

        return <Grid container spacing={16}>
            <Grid item xs={12}>
                <BlockedUsersList/>
            </Grid>
            <Grid item xs={12}>
                <LoadMoreBlogBlockingsButton/>
            </Grid>
        </Grid>
    };

    render() {
        const {blogBlockingsStore, l} = this.props;

        return <Grid container>
            <Grid item xs={12}>
                <AppBar title={
                    blogBlockingsStore.blog
                        ? l('blogBlockings_withBlogSpecified', {blogName: blogBlockingsStore.blog.name})
                        : l('blogBlockings')
                }/>
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

BlogBlockings.propTypes = {
    blogBlockingsStore: PropTypes.object,
    authStore: PropTypes.object,
    l: PropTypes.func
};

export default BlogBlockings;
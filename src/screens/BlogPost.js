import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {CommentsSection} from "../Comment";
import {BlogPostListItem} from "../BlogPost";
import AppBar from '../AppBar';
import {withLocale} from "../localization";

@withLocale
@inject('blogPostStore')
@observer
class BlogPost extends React.Component {
    renderContent = () => {
        const {blogPostStore, l} = this.props;
        const {blogPost, error} = blogPostStore;

        if (blogPostStore.pending) {
            return <CircularProgress color="primary"
                                     size={100}
                                     style={{
                                         marginLeft: 'calc(50% - 50px)',
                                     }}
            />
        }

        if (error) {
            return error.status === 404 || error.status === 400
                ?  <Typography variant="headline">
                        {l('blogPostNotFound')}
                    </Typography>
                : <Typography variant="headline">
                    {l('errorWhenAttemptedToFetchBlogPost', {errorStatus: error.status})}
                </Typography>
        }

        if (blogPost) {
            return <Grid container spacing={16}>
                <Grid item xs={12}>
                    <BlogPostListItem blogPost={blogPost}/>
                </Grid>
                <Grid item xs={12}>
                    <CommentsSection/>
                </Grid>
            </Grid>
        }
    };

    render() {
        return <Grid container>
            <Grid item xs={12}>
                <AppBar/>
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

BlogPost.propTypes = {
    blogPostStore: PropTypes.object,
    l: PropTypes.func
};

export default BlogPost;
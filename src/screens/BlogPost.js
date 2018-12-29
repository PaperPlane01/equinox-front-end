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
import Hidden from "@material-ui/core/Hidden/Hidden";

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
                                         position: 'absolute',
                                         top: '50%',
                                         left: '50%',
                                         marginTop: '-50px',
                                         marginLeft: '-50px',
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
            <Hidden mdUp>
                <Grid item xs={12}>
                    <div style={{
                        marginLeft: '2.08333333334%',
                        marginRight: '2.08333333334%',
                    }}>
                        <div style={{
                            marginTop: '16px',
                            width: '100%'
                        }}>
                            {this.renderContent()}
                        </div>
                    </div>
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item lg={2}/>
                <Grid item xs={11} lg={8}>
                    <div style={{
                        marginTop: '16px',
                        width: '100%'
                    }}>
                        {this.renderContent()}
                    </div>
                </Grid>
            </Hidden>
        </Grid>
    }
}

BlogPost.propTypes = {
    blogPostStore: PropTypes.object,
    l: PropTypes.func
};

export default BlogPost;
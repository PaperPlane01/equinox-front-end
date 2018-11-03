import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import BlogPostHeader from './BlogPostHeader';
import BlogPostBody from './BlogPostBody';
import BlogPostLikeButton from './BlogPostLikeButton';
import NumberOfViews from './NumberOfViews';
import NumberOfComments from './NumberOfComments';

@inject('authStore')
@observer
class BlogPostListItem extends React.Component {
    render() {
        const {blogPost, authStore} = this.props;

        return <Card>
            <BlogPostHeader blogPost={blogPost}/>
            <CardContent>
                <BlogPostBody title={blogPost.title}
                              content={blogPost.content}
                />
            </CardContent>
            <CardActions>
                <Grid container justify="center">
                    <Grid item xs={4}>
                        <BlogPostLikeButton blogPostId={blogPost.id}
                                            clicked={blogPost.likedByCurrentUser}
                                            canBeClicked={authStore.loggedIn}
                                            numberOfLikes={blogPost.numberOfLikes}
                                            blogPostLikeId={blogPost.likeId}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <NumberOfComments numberOfComments={blogPost.numberOfComments}
                                          blogPostId={blogPost.id}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <NumberOfViews numberOfViews={blogPost.numberOfViews}/>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    }
}

BlogPostListItem.propTypes = {
    blogPost: PropTypes.object,
    authStore: PropTypes.object,
    store: PropTypes.object
};

export default BlogPostListItem;


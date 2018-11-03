import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import BlogPostListItem from './BlogPostListItem';
import {withLocale} from "../../localization";

@withLocale
@inject('blogPostListStore')
@observer
class BlogPostsList extends React.Component {
    render() {
        const {l, blogPostListStore} = this.props;
        const {pending, blogPosts} = blogPostListStore;

        return (blogPosts.result.length === 0 && !pending)
            ? <Typography variant="subtitle">
                {l('noBlogPosts')}
            </Typography>
            : <Grid container spacing={16}>
                    {blogPostListStore.blogPosts.result.map(blogPostId => (
                            <Grid item xs={12}>
                                <BlogPostListItem
                                    blogPost={blogPostListStore.blogPosts.entities.blogPosts[blogPostId]}/>
                            </Grid>
                    ))}
                    {pending && <CircularProgress size={50}
                                                  color="primary"
                                                  style={{
                                                      marginLeft: 'calc(50% - 50px)',
                                                  }}
                    />}
                </Grid>
    }
}

BlogPostsList.propTypes = {
    l: PropTypes.func,
    blogPostListStore: PropTypes.object
};

export default BlogPostsList;
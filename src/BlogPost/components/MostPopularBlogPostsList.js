import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import BlogPostListItem from './BlogPostListItem';
import MostPopularBlogPostsPeriodSelect from './MostPopularBlogPostsPeriodSelect';
import LoadMoreBlogPostsButton from './LoadMoreBlogPostsButton';
import {withLocale} from "../../localization";

@withLocale
@inject('mostPopularBlogPostsStore')
@observer
class MostPopularBlogPostsList extends React.Component {
    render() {
        const {l, mostPopularBlogPostsStore} = this.props;
        const {blogPosts, pending} = mostPopularBlogPostsStore;

        return <Grid container spacing={16}>
            <Grid item xs={12}>
                <Typography variant="headline">
                    {l('mostPopularBlogPosts')}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <span>
                    <MostPopularBlogPostsPeriodSelect/>
                    {pending && <CircularProgress size={20}
                                                  color="primary"
                    />}
                </span>
            </Grid>
            {blogPosts.result.length === 0 && !pending && <Grid item xs={12}>
                <Typography variant="body1">
                    {l('noBlogPostsForThisPeriod')}
                </Typography>
            </Grid>}
            {blogPosts.result.map(blogPostId => (
                <Grid item xs={12}>
                    <BlogPostListItem blogPost={blogPosts.entities.blogPosts[blogPostId]}
                                      showIconIfPinned={false}
                    />
                </Grid>
            ))}
            <Grid item xs={12}>
                <span>
                    <LoadMoreBlogPostsButton source="mostPopularBlogPostsStore"/>
                    {pending && blogPosts.result.length !== 0 && <CircularProgress size={20}
                                                                                   color="primary"
                    />}
                </span>
            </Grid>
        </Grid>
    }
}

MostPopularBlogPostsList.propTypes = {
    l: PropTypes.func,
    mostPopularBlogPostsStore: PropTypes.object
};

export default MostPopularBlogPostsList;
import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import BlogPostListItem from './BlogPostListItem';
import {withLocale} from "../../localization";

@withLocale
@inject('feedStore')
@observer
class FeedList extends React.Component {
    render() {
        const {feedStore, l} = this.props;
        const {pending, blogPosts} = feedStore;

        return (blogPosts.result.length === 0 && !pending)
            ? <Typography variant="subtitle1">
                {l('emptyFeed')}
            </Typography>
            : <Grid container spacing={16}>
                {blogPosts.result.map(blogPostId => (
                    <Grid item xs={12}>
                        <BlogPostListItem blogPost={blogPosts.entities.blogPosts[blogPostId]}
                                          showIconIfPinned={false}
                        />
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

FeedList.propTypes = {
    feedStore: PropTypes.object,
    l: PropTypes.func
};

export default FeedList;
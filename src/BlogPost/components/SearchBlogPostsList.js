import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BlogPostListItem from './BlogPostListItem';
import SearchBlogPostsQueryTextField from './SearchBlogPostsQueryTextField';
import LoadMoreBlogPostsButton from './LoadMoreBlogPostsButton';
import CircularProgress from "@material-ui/core/CircularProgress";
import {withLocale} from "../../localization";


@withLocale
@inject('searchBlogPostsStore')
@observer
class SearchBlogPostsList extends React.Component {
    render() {
        const {searchBlogPostsStore, l} = this.props;
        const {blogPosts, pending} = searchBlogPostsStore;
        console.log(blogPosts);

        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <SearchBlogPostsQueryTextField fullWidth/>
                </Grid>
                {blogPosts.length === 0 && pending && (
                    <Grid item xs={12}>
                        <CircularProgress size={50}
                                          color="primary"
                                          style={{
                                              marginLeft: 'calc(50% - 50px)',
                                          }}
                        />
                    </Grid>
                )}
                {blogPosts.length === 0 && !pending
                    ? <Grid item xs={12}>
                        <Typography variant="headline">{l('noBlogPostsFound')}</Typography>
                    </Grid>
                    : <Grid item xs={12}>
                        <Grid container spacing={16}>
                            {blogPosts.map(blogPost => (
                                <Grid item xs={12}>
                                    <BlogPostListItem blogPost={blogPost}
                                                      showIconIfPinned={false}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                }
                <LoadMoreBlogPostsButton source="searchBlogPostsStore"/>
                {pending && blogPosts.length !== 0 && (
                    <CircularProgress size={50}
                                      color="primary"
                                      style={{
                                          marginLeft: 'calc(50% - 50px)',
                                      }}
                    />
                )}
            </Grid>
        )
    }
}

SearchBlogPostsList.propTypes = {
    searchBlogPostsStore: PropTypes.object,
    l: PropTypes.func
};

export default SearchBlogPostsList;
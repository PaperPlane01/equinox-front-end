import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../localization";

@withLocale
@inject('blogPostListStore')
@inject('feedStore')
@inject('mostPopularBlogPostsStore')
@observer
class LoadMoreBlogPostsButton extends React.Component {
    render() {
        const {blogPostListStore, feedStore, source, mostPopularBlogPostsStore, l} = this.props;

        let fetchBlogPosts = undefined;

        switch (source) {
            case "feedStore":
                fetchBlogPosts = feedStore.fetchFeed;
                break;
            case "blogPostListStore":
                fetchBlogPosts = blogPostListStore.fetchBlogPosts;
                break;
            case "mostPopularBlogPostsStore":
                fetchBlogPosts = mostPopularBlogPostsStore.fetchMostPopularBlogPosts;
                break;
            default:
                fetchBlogPosts = blogPostListStore.fetchBlogPosts;
                break;
        }

        return <Button variant="outlined"
                       color="primary"
                       onClick={fetchBlogPosts}
        >
            {l('loadMore')}
        </Button>
    }
}

LoadMoreBlogPostsButton.propTypes = {
    blogPostListStore: PropTypes.object,
    feedStore: PropTypes.object,
    source: PropTypes.string,
    mostPopularBlogPostsStore: PropTypes.object,
    l: PropTypes.func
};

export default LoadMoreBlogPostsButton;
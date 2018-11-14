import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../localization";

@withLocale
@inject('blogPostListStore')
@inject('feedStore')
@observer
class LoadMoreBlogPostsButton extends React.Component {
    render() {
        const {blogPostListStore, feedStore, source, l} = this.props;

        const fetchBlogPosts = source === "feedStore" ? feedStore.fetchFeed : blogPostListStore.fetchBlogPosts;

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
    l: PropTypes.func
};

export default LoadMoreBlogPostsButton;
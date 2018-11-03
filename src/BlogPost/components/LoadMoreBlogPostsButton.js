import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../localization";

@withLocale
@inject('blogPostListStore')
@observer
class LoadMoreBlogPostsButton extends React.Component {
    render() {
        const {blogPostListStore, l} = this.props;

        return <Button variant="outlined"
                       color="primary"
                       onClick={blogPostListStore.fetchBlogPosts}
        >
            {l('loadMore')}
        </Button>
    }
}

LoadMoreBlogPostsButton.propTypes = {
    blogPostListStore: PropTypes.object,
    l: PropTypes.func
};

export default LoadMoreBlogPostsButton;
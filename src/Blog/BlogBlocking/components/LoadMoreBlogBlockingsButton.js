import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../../localization";

@withLocale
@inject('blogBlockingsStore')
@observer
class LoadMoreBlogBlockingsButton extends React.Component {
    render() {
        const {blogBlockingsStore, l} = this.props;

        return <Button variant="outlined"
                       color="primary"
                       onClick={blogBlockingsStore.fetchBlogBlocking}
        >
            {l('loadMore')}
        </Button>
    }
}

LoadMoreBlogBlockingsButton.propTypes = {
    blogBlockingsStore: PropTypes.object,
    l: PropTypes.func
};

export default LoadMoreBlogBlockingsButton;
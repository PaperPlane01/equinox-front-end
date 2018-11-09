import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../localization";

@withLocale
@inject('blogSubscribersListStore')
@observer
class LoadMoreSubscribersButton extends React.Component {
    render() {
        const {blogSubscribersListStore, l} = this.props;

        return <Button variant="outlined"
                       color="primary"
                       onClick={blogSubscribersListStore.fetchSubscriptions}
        >
            {l('loadMore')}
        </Button>
    }
}

LoadMoreSubscribersButton.propTypes = {
    blogSubscribersListStore: PropTypes.object,
    l: PropTypes.func
};

export default LoadMoreSubscribersButton;
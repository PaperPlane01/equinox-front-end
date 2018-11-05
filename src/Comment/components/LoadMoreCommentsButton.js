import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../localization";

@withLocale
@inject('commentListStore')
@observer
class LoadMoreCommentsButton extends React.Component {
    render() {
        const {commentListStore, l} = this.props;

        return <Button variant="outlined"
                       color="primary"
                       onClick={commentListStore.fetchComments}
        >
            {l('loadMore')}
        </Button>
    }
}

LoadMoreCommentsButton.propTypes = {
    commentListStore: PropTypes.object,
    l: PropTypes.func
};

export default LoadMoreCommentsButton;
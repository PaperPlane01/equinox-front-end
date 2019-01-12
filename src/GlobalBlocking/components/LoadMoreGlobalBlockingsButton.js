import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../localization";

@withLocale
@inject('globalBlockingsStore')
@observer
class LoadMoreGlobalBlockingsButton extends React.Component {
    render() {
        const {globalBlockingsStore, l} = this.props;

        return <Button variant="contained"
                       color="primary"
                       onClick={globalBlockingsStore.fetchGlobalBlockings}
        >
            {l('loadMore')}
        </Button>
    }
}

LoadMoreGlobalBlockingsButton.propTypes = {
    globalBlockingsStore: PropTypes.object,
    l: PropTypes.func
};

export default LoadMoreGlobalBlockingsButton;
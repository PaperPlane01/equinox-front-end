import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../localization";

@withLocale
@inject('blogManagersStore')
@observer
class LoadMoreBlogManagersButton extends React.Component {
    render() {
        const {l, blogManagersStore} = this.props;

        return <Button variant="outlined"
                       onClick={() => blogManagersStore.fetchBlogManagers()}
                       color="primary"
        >
            {l('loadMore')}
        </Button>
    }
}

LoadMoreBlogManagersButton.propTypes = {
    blogManagersStore: PropTypes.object,
    l: PropTypes.func
};

export default LoadMoreBlogManagersButton;
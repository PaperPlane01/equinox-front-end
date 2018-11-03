import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../localization/index";

@withLocale
@inject('unsubscribeFromBlogStore')
@observer
class UnsubscribeFromBlogButton extends React.Component {
    render() {
        const {unsubscribeFromBlogStore, l} = this.props;
        return <Button variant="outlined"
                       color="primary"
                       fullWidth
                       onClick={unsubscribeFromBlogStore.unsubscribeFromBlog}
        >
            {l('unsubscribe')}
        </Button>
    }
}

UnsubscribeFromBlogButton.propTypes = {
    unsubscribeFromBlogStore: PropTypes.object,
    l: PropTypes.func
};

export default UnsubscribeFromBlogButton;
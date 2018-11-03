import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../localization";

@withLocale
@inject('subscribeToBlogStore')
@observer
class SubscribeToBlogButton extends React.Component {
    render() {
        const {subscribeToBlogStore, l} = this.props;

        return <Button color="primary"
                       variant="contained"
                       onClick={subscribeToBlogStore.subscribeToBlog}
                       fullWidth
        >
            {l('subscribe')}
        </Button>
    }
}

SubscribeToBlogButton.propTypes = {
    subscribeToBlogStore: PropTypes.object,
    l: PropTypes.func
};

export default SubscribeToBlogButton;
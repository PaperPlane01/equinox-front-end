import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../localization";

@withLocale
@inject('createCommentStore')
@observer
class ReplyToCommentButton extends React.Component {
    handleClick = () => {
        const {rootCommentId, referredCommentId, createCommentStore} = this.props;

        if (createCommentStore.rootCommentId && createCommentStore.referredCommentId
            && rootCommentId === createCommentStore.rootCommentId
            && referredCommentId === createCommentStore.referredCommentId) {
            createCommentStore.setRootCommentId(undefined);
            createCommentStore.setReferredCommentId(undefined);
        } else {
            createCommentStore.setRootCommentId(rootCommentId);
            createCommentStore.setReferredCommentId(referredCommentId);
        }
    };

    render() {
        const {l} = this.props;

        return <Button color="primary"
                       onClick={this.handleClick}
        >
            {l('reply')}
        </Button>
    }
}

ReplyToCommentButton.propTypes = {
    rootCommentId: PropTypes.number,
    referredCommentId: PropTypes.number,
    createCommentStore: PropTypes.object,
    l: PropTypes.func
};

export default ReplyToCommentButton;
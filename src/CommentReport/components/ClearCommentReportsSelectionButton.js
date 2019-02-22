import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

@inject('commentReportListStore')
@observer
class ClearCommentReportsSelectionButton extends React.Component {
    render() {
        const {commentReportListStore} = this.props;

        return (
            <IconButton size="small"
                        onClick={commentReportListStore.clearSelection}
            >
                <ClearIcon/>
            </IconButton>
        )
    }
}

ClearCommentReportsSelectionButton.propTypes = {
    commentReportListStore: PropTypes.object
};

export default ClearCommentReportsSelectionButton;
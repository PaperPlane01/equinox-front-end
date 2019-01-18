import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {ReportReasonSelect} from "../../Report";

@inject('createCommentReportStore')
@observer
class CommentReportReasonSelect extends React.Component {
    render() {
        const {createCommentReportStore} = this.props;
        const {reason} = createCommentReportStore.createCommentReportFormValues;

        return <ReportReasonSelect value={reason}
                                   onChange={reason => createCommentReportStore.setCreateCommentReportFormValue(reason, 'reason')}
        />
    }
}

CommentReportReasonSelect.propTypes = {
    createCommentReportStore: PropTypes.object
};

export default CommentReportReasonSelect;
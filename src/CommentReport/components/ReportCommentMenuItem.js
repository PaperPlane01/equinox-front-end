import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {ReportMenuItem} from "../../Report";

@inject('createCommentReportStore')
@observer
class ReportCommentMenuItem extends React.Component {
    handleClick = () => {
        const {onClick, commentId, createCommentReportStore} = this.props;

        if (onClick) {
            onClick();
        }

        createCommentReportStore.setCommentId(commentId);
        createCommentReportStore.setCreateCommentReportDialogOpen(true);
    };

    render() {
        return <ReportMenuItem onClick={this.handleClick}/>
    }
}

ReportCommentMenuItem.propTypes = {
    commentId: PropTypes.number,
    onClick: PropTypes.func,
    createCommentReportStore: PropTypes.object
};

export default ReportCommentMenuItem;
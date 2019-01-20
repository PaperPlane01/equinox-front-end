import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {ReportReasonSelect} from '../../Report';

@inject('createBlogPostReportStore')
@observer
class BlogPostReportReasonSelect extends React.Component {
    render() {
        const {createBlogPostReportStore} = this.props;

        return <ReportReasonSelect onChange={reason => createBlogPostReportStore.setCreateBlogPostReportFormValue(reason, 'reason')}
                                   value={createBlogPostReportStore.createBlogPostReportFormValues.reason}
                                   error={createBlogPostReportStore.createBlogPostReportFormErrors.reason}
        />
    }
}

BlogPostReportReasonSelect.propTypes = {
    createBlogPostReportStore: PropTypes.object
};

export default BlogPostReportReasonSelect;
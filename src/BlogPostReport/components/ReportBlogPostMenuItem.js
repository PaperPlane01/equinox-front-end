import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {ReportMenuItem} from '../../Report';

@inject('createBlogPostReportStore')
@observer
class ReportBlogPostMenuItem extends React.Component {
    handleClick = () => {
        const {blogPostId, createBlogPostReportStore, onClick} = this.props;

        if (onClick) {
            onClick();
        }

        createBlogPostReportStore.setBlogPostId(blogPostId);
        createBlogPostReportStore.setReportBlogPostDialogOpen(true);
    };

    render() {
        return <ReportMenuItem onClick={this.handleClick}/>
    }
}

ReportBlogPostMenuItem.propTypes = {
    blogPostId: PropTypes.number,
    onClick: PropTypes.func,
    createBlogPostReportStore: PropTypes.object,
};

export default ReportBlogPostMenuItem;
import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

@inject('blogPostReportListStore')
@observer
class ClearBlogPostReportsSelectionButton extends React.Component {
    render() {
        const {blogPostReportListStore} = this.props;

        return (
            <IconButton size="small"
                        onClick={blogPostReportListStore.clearSelection}
            >
                <ClearIcon/>
            </IconButton>
        )
    }
}

ClearBlogPostReportsSelectionButton.propTypes = {
    blogPostReportListStore: PropTypes.object
};

export default ClearBlogPostReportsSelectionButton;
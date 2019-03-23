import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DeleteIcon from '@material-ui/icons/Delete';
import {withLocale} from "../../localization";

@withLocale
@inject('deleteSelectedReportedBlogPostsStore')
@observer
class DeleteBlogPostsButton extends React.Component {
    render() {
        const {deleteSelectedReportedBlogPostsStore, l} = this.props;

        return (
            <BottomNavigationAction onClick={deleteSelectedReportedBlogPostsStore.deleteBlogPosts}
                                    showLabel
                                    label={l('deleteBlogPosts')}
                                    icon={<DeleteIcon/>}
            />
        )
    }
}

DeleteBlogPostsButton.propTypes = {
    deleteSelectedReportedBlogPostsStore: PropTypes.object,
    l: PropTypes.func
};

export default DeleteBlogPostsButton;
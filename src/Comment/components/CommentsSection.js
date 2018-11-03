import React from 'react';
import {inject, observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import CreateCommentForm from './CreateCommentForm';
import CommentList from './CommentList';
import {canCreateComment} from "../permissions";

@inject('blogPostStore')
@inject('authStore')
@observer
class CommentsSection extends React.Component {
    render() {
        const {blogPostStore, authStore} = this.props;
        const {blogPost} = blogPostStore;
        const {currentUser} = authStore;

        return <Grid container spacing={16}>
            {canCreateComment(currentUser, blogPost.blogId) &&  <Grid item xs={12}>
                <CreateCommentForm/>
            </Grid>}
            <Grid item xs={12}>
                <CommentList/>
            </Grid>
        </Grid>
    }
}

export default CommentsSection;
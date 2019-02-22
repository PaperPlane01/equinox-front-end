import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import CommentHeader from './CommentHeader';
import CommentLikeButton from './CommentLikeButton';
import CommentActionsMenu from './CommentActionsMenu';
import ReplyToCommentButton from './ReplyToCommentButton';
import CreateCommentForm from './CreateCommentForm';
import {withLocale} from "../../localization";
import {canCreateComment} from "../permissions";

const style = theme => ({
    highlighted: {
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: theme.palette.primary.main
    }
});

@withLocale
@inject('createCommentStore')
@inject('store')
@inject('authStore')
@observer
class CommentListItem extends React.Component {
    render() {
        const {comment, highlight, store, authStore, l, createCommentStore, classes} = this.props;
        const canComment = canCreateComment(authStore.currentUser, comment.blogId);

        return <React.Fragment>
            <div className={highlight ? classes.highlighted : ''}
                 id={`comment-id${comment.id}`}
            >
                <CommentHeader authorId={comment.author.id}
                               authorAvatarUri={comment.author.avatarUri}
                               authorLetterAvatarColor={comment.author.letterAvatarColor}
                               authorDisplayedName={comment.author.displayedName}
                               createdAt={comment.createdAt}
                               action={<CommentActionsMenu comment={comment}/>}
                />
                <CardContent>
                    {comment.deleted ? <i>{l('commentDeleted')}</i> : comment.content}
                </CardContent>
                <CardActions>
                    <CommentLikeButton clicked={comment.likedByCurrentUser}
                                       canBeClicked={authStore.loggedIn && !comment.deleted}
                                       numberOfLikes={comment.numberOfLikes}
                                       commentId={comment.id}
                                       commentLikeId={comment.likeId}
                    />
                    {canComment && <ReplyToCommentButton rootCommentId={comment.rootCommentId || comment.id}
                                                         referredCommentId={comment.id}
                    />}
                </CardActions>
            </div>
            {(canComment && createCommentStore.referredCommentId === comment.id) && <CreateCommentForm/>}
            <Divider/>
        </React.Fragment>
    }
}

CommentListItem.propTypes = {
    comment: PropTypes.object,
    highlight: PropTypes.bool,
    store: PropTypes.object,
    authStore: PropTypes.object,
    createCommentStore: PropTypes.object,
    l: PropTypes.func,
    classes: PropTypes.object
};

export default withStyles(style)(CommentListItem);
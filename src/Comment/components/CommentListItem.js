import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'mobx-router';
import CommentLikeButton from './CommentLikeButton';
import CommentActionsMenu from './CommentActionsMenu';
import ReplyToCommentButton from './ReplyToCommentButton';
import CreateCommentForm from './CreateCommentForm';
import views from '../../router-config';
import {withLocale} from "../../localization";
import Avatar from '../../Avatar';
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
                <CardHeader title={<Link store={store}
                                         view={views.userProfile}
                                         params={{id: comment.author.id}}
                                         style={{
                                             textDecoration: 'none'
                                         }}
                >
                    {comment.author.displayedName}
                    </Link>}
                            avatar={<Avatar avatarUri={comment.author.avatarUri}
                                            avatarColor={comment.author.letterAvatarColor}
                                            avatarLetter={comment.author.displayedName[0]}
                                            height={60}
                                            width={60}
                            />}
                            subheader={comment.createdAt}
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
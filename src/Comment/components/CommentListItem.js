import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'mobx-router';
import CommentLikeButton from './CommentLikeButton';
import CommentActionsMenu from './CommentActionsMenu';
import views from '../../router-config';
import {withLocale} from "../../localization";

@withLocale
@inject('store')
@inject('authStore')
@observer
class CommentListItem extends React.Component {
    render() {
        const {comment, store, authStore, l} = this.props;

        return <div>
            <CardHeader title={<Link store={store}
                                     view={views.userProfile}
                                     params={{id: comment.author.id}}
                                     style={{
                                         textDecoration: 'none'
                                     }}
            >
                {comment.author.displayedName}
            </Link>}
                        avatar={comment.author.avatarUri
                            ? <Avatar imgProps={{
                                width: '60px',
                                height: '60px'
                            }}
                                      src={comment.author.avatarUri}/>
                            : <Avatar imgProps={{
                                width: '60px',
                                height: '60px'
                            }}
                                      style={{backgroundColor: comment.author.letterAvatarColor}}>
                                {comment.author.displayedName[0]}
                            </Avatar>}
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
            </CardActions>
        </div>
    }
}

CommentListItem.propTypes = {
    comment: PropTypes.object,
    store: PropTypes.object,
    authStore: PropTypes.object,
    l: PropTypes.func
};

export default CommentListItem;
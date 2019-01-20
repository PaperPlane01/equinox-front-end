import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteOutlined from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';
import {prettifyNumber} from "../../utils";

@inject('commentLikeStore')
@observer
class CommentLikeButton extends React.Component {
    handleClick = () => {
        const {commentLikeStore, clicked, canBeClicked, commentLikeId, commentId} = this.props;

        if (!canBeClicked) {
            return;
        }

        if (clicked) {
            commentLikeStore.deleteCommentLike(commentId, commentLikeId);
        } else {
            commentLikeStore.createCommentLike(commentId);
        }
    };

    render() {
        const {clicked, numberOfLikes} = this.props;

        return <IconButton onClick={this.handleClick}
                           color="primary"
        >
            {clicked ? <FavoriteIcon/> : <FavoriteOutlined/>}
            <Typography variant="body1" color="primary">{prettifyNumber(numberOfLikes)}</Typography>
        </IconButton>
    }
}

CommentLikeButton.propTypes = {
    commentLikeStore: PropTypes.object,
    commentId: PropTypes.number,
    clicked: PropTypes.boolean,
    canBeClicked: PropTypes.boolean,
    commentLikeId: PropTypes.number,
    numberOfLikes: PropTypes.number
};

export default CommentLikeButton;

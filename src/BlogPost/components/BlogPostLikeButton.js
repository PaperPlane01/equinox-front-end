import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';
import {prettifyNumber} from "../../utils";

@inject('blogPostLikeStore')
@observer
class BlogPostLikeButton extends React.Component {
    handleClick = () => {
        const {clicked, canBeClicked, blogPostLikeStore, blogPostId, blogPostLikeId} = this.props;

        if (!canBeClicked) {
            return;
        }

        if (clicked) {
            blogPostLikeStore.deleteBlogPostLike(blogPostId, blogPostLikeId);
        } else {
            blogPostLikeStore.createBlogPostLike(blogPostId);
        }
    };

    render() {
        const {numberOfLikes, clicked} = this.props;

        return <IconButton onClick={this.handleClick}
                          color="primary"
        >
            {clicked ? <FavoriteIcon/> : <FavoriteOutlinedIcon/>}
            <Typography variant="body1" color="primary">
                {prettifyNumber(numberOfLikes)}
            </Typography>
        </IconButton>
    }
}

BlogPostLikeButton.propTypes = {
    blogPostId: PropTypes.number,
    numberOfLikes: PropTypes.number,
    clicked: PropTypes.bool,
    canBeClicked: PropTypes.bool,
    blogPostLikeId: PropTypes.number,
    blogPostLikeStore: PropTypes.object,
};

export default BlogPostLikeButton;
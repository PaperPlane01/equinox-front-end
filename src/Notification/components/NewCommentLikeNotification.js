import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '../../Avatar';
import {withLocale} from "../../localization";

@withLocale
class NewCommentLikeNotification extends React.Component {
    handleClick = () => {
        const {onClick} = this.props;

        if (onClick) {
            onClick();
        }
    };

    render() {
        const {l, commentLike, comment} = this.props;
        const {user} = commentLike;

        let commentText = comment.content;

        if (commentText.length > 140) {
            commentText = commentText.slice(0, 139);
            commentText = commentText + "...";
        }

        return <div onClick={this.handleClick}>
            <CardHeader title={l('userLikedYourComment', {username: user.displayedName})}
                        avatar={<Avatar avatarLetter={user.displayedName[0]}
                                        avatarColor={user.letterAvatarColor}
                                        avatarUri={user.avatarUri}
                                        width={60}
                                        height={60}
                        />}
            />
            <CardContent>
                <Typography variant="subheading"
                            style={{
                                lineBreak: 'word'
                            }}
                >
                    {commentText}
                </Typography>
            </CardContent>
        </div>
    }
}

NewCommentLikeNotification.propTypes = {
    comment: PropTypes.object,
    commentLike: PropTypes.object,
    onClick: PropTypes.func,
    l: PropTypes.func
};

export default NewCommentLikeNotification;

import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '../../Avatar';
import {withLocale} from "../../localization";

@withLocale
class NewCommentReplyNotification extends React.Component {
    handleClick = () => {
        const {onClick} = this.props;

        if (onClick) {
            onClick();
        }
    };

    render() {
        const {l, reply} = this.props;
        const {author} = reply;

        let commentText = reply.content;

        if (commentText.length > 140) {
            commentText = commentText.slice(0, 139);
            commentText = commentText + "...";
        }

        return <div onClick={this.handleClick}>
            <CardHeader title={l('userRepliedToYourComment', {username: author.displayedName})}
                        avatar={<Avatar avatarLetter={author.displayedName[0]}
                                        avatarColor={author.letterAvatarColor}
                                        avatarUri={author.avatarUri}
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

NewCommentReplyNotification.propTypes = {
    reply: PropTypes.object,
    l: PropTypes.func
};

export default NewCommentReplyNotification;
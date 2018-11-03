import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {convertFromRaw} from 'draft-js';
import Avatar from '../../Avatar';
import {withLocale} from "../../localization";

@withLocale
class NewBlogPostNotification extends React.Component {
    handleClick = () => {
        const {onClick} = this.props;

        if (onClick) {
            onClick();
        }
    };

    render() {
        const {blogPost, l} = this.props;
        let blogPostText = convertFromRaw(blogPost.content).getPlainText();

        if (blogPostText.length > 140) {
            blogPostText = blogPostText.slice(0, 139);
            blogPostText = blogPostText + "...";
        }

        return <div onClick={this.handleClick}>
            <CardHeader avatar={<Avatar width={40}
                                        height={40}
                                        avatarLetter={blogPost.publisher.displayedName[0]}
                                        avatarColor={blogPost.publisher.letterAvatarColor}
                                        avatarUri={blogPost.publisher.avatarUri}
            />}
                        title={blogPost.title
                            ? l('newBlogPostPublished_withTitle', {
                                displayedName: blogPost.publisher.displayedName,
                                title: blogPost.title
                            })
                            : l('newBlogPostPublished', {displayedName: blogPost.publisher.displayedName})}
            />
            <CardContent>
                <Typography variant="subheading" style={{
                    lineBreak: 'word'
                }}>
                    {blogPostText}
                </Typography>
            </CardContent>
        </div>
    }
}

NewBlogPostNotification.propTypes = {
    blogPost: PropTypes.object,
    l: PropTypes.func,
    onClick: PropTypes.func
};

export default NewBlogPostNotification;
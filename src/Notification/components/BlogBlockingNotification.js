import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '../../Avatar';
import {withLocale} from "../../localization";

@withLocale
class BlogBlockingNotification extends React.Component {
    render() {
        const {blogBlocking, l, onClick} = this.props;

        return <div onClick={onClick}>
            <CardHeader avatar={<Avatar height={60}
                                        width={60}
                                        avatarUri={blogBlocking.blog.avatarUri}
                                        avatarColor={blogBlocking.blog.letterAvatarColor}
                                        avatarLetter={blogBlocking.blog.name[0]}
            />}
                        title={l('youWereBlockedInBlog', {blogName: blogBlocking.blog.name})}
            />
        </div>
    }
}

BlogBlockingNotification.propTypes = {
    blogBlocking: PropTypes.object,
    onClick: PropTypes.func,
    l: PropTypes.func
};

export default BlogBlockingNotification;
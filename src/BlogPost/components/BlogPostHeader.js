import React from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import CardHeader from '@material-ui/core/CardHeader';
import {Link} from 'mobx-router';
import Avatar from '../../Avatar';
import views from '../../router-config';
import BlogPostActionsMenu from "./BlogPostActionsMenu";

@inject('store')
class BlogPostHeader extends React.Component {
    render() {
        const {blogPost, store} = this.props;

        const linkToPublisher = (<Link store={store}
                                       view={blogPost.publishedBy === 'BLOG' ? views.blog : views.userProfile}
                                       params={{id: blogPost.publisher.id}}
                                       style={{
                                           textDecoration: 'none'
                                       }}
        >
            {blogPost.publisher.displayedName}
        </Link>);

        return <CardHeader title={linkToPublisher}
                           subheader={blogPost.createdAt}
                           avatar={<Avatar avatarUri={blogPost.publisher.avatarUri}
                                           avatarColor={blogPost.publisher.letterAvatarColor}
                                           avatarLetter={blogPost.publisher.displayedName[0]}
                                           height={60}
                                           width={60}
                           />}
                           action={<BlogPostActionsMenu blogPost={blogPost}/>}
        />
    }
}

BlogPostHeader.propTypes = {
    store: PropTypes.object,
    blogPost: PropTypes.object
};

export default BlogPostHeader;
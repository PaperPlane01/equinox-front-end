import React from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import CardHeader from '@material-ui/core/CardHeader';
import {Link} from 'mobx-router';
import moment from 'moment';
import Avatar from '../../Avatar';
import views from '../../router-config';
import BlogPostActionsMenu from "./BlogPostActionsMenu";
import PinIcon from '../../icons/PinIcon';
import {withLocale} from "../../localization";

@withLocale
@inject('store')
class BlogPostHeader extends React.Component {
    render() {
        const {blogPost, store, l} = this.props;

        const linkToPublisher = (<Link store={store}
                                       view={blogPost.publishedBy === 'BLOG' ? views.blog : views.userProfile}
                                       params={{id: blogPost.publisher.id}}
                                       style={{
                                           textDecoration: 'none'
                                       }}
        >
            {blogPost.publisher.displayedName}
        </Link>);
        const subheader = (<span>
            {moment(blogPost.createdAt).format("DD-MM-YYYY HH:mm:ss") + " "}
            {blogPost.pinned
                ? <PinIcon fontSize="small"/>
                : ""}
        </span>);

        return <CardHeader title={linkToPublisher}
                           subheader={subheader}
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
    blogPost: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func
};

export default BlogPostHeader;
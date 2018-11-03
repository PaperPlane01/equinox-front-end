import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import BlogActionsMenu from './BlogActionsMenu';
import {withLocale} from "../../localization";
import {isBlank} from "../../utils";

@withLocale
@inject('blogStore')
@observer
class BlogDescription extends React.Component {
    render() {
        const {blogStore} = this.props;
        const {blog} = blogStore;

        return <Card>
            <CardHeader avatar={!isBlank(blog.avatarUri)
                ? <Avatar imgProps={{
                    width: 60,
                    height: 60
                }}
                          src={blog.avatarUri}/>
                : <Avatar imgProps={{
                    width: 60,
                    height: 60
                }}
                    style={{
                              backgroundColor: blog.letterAvatarColor && blog.letterAvatarColor
                          }}
                >
                    {blog.name[0]}
                </Avatar>
            }
                        title={blog.name}
                        subheader={blog.description && blog.description}
                        action={<BlogActionsMenu blog={blog}/>}
            />
        </Card>
    }
}

BlogDescription.propTypes = {
    blogStore: PropTypes.object,
    l: PropTypes.func
};

export default BlogDescription;
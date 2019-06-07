import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {inject, observer} from "mobx-react";
import {Link} from "mobx-router";
import Avatar from "../../Avatar";
import views from "../../router-config";

@inject('store')
@observer
class LinkToBlog extends React.Component {
    handleClick = () => {
        const {onClick} = this.props;

        if (onClick) {
            onClick();
        }
    };

    render() {
        const {blogId, blogAvatarUri, blogName, blogLetterAvatarColor, store} = this.props;

        return <Link view={views.blog}
                     store={store}
                     params={{id: blogId}}
                     style={{
                         textDecoration: 'none'
                     }}
        >
            <ListItem onClick={this.handleClick}>
                <Avatar avatarLetter={blogName[0]}
                        avatarColor={blogLetterAvatarColor}
                        avatarUri={blogAvatarUri}
                        width={60}
                        height={60}
                />
                <ListItemText>
                    {blogName}
                </ListItemText>
            </ListItem>
        </Link>
    }
}

LinkToBlog.propTypes = {
    blogId: PropTypes.number,
    blogName: PropTypes.string,
    blogAvatarUri: PropTypes.string,
    blogLetterAvatarColor: PropTypes.string,
    store: PropTypes.object,
    onClick: PropTypes.func
};

export default LinkToBlog;
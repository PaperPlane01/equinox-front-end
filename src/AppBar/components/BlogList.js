import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemText from "@material-ui/core/ListItemText";
import DrawerLinkToBlog from "./DrawerLinkToBlog";
import {withLocale} from "../../localization";

@withLocale
class BlogList extends React.Component {
    handleClick = () => {
        const {onItemClick} = this.props;

        if (onItemClick) {
            onItemClick();
        }
    };

    render() {
        const {blogs, pending, emptyLabel} = this.props;

        return (
            <List component="div"
                  disablePadding
            >
                {(blogs.length === 0 && pending) && <CircularProgress size={20}
                                                                      color="primary"
                                                                      style={{
                                                                          marginLeft: 'calc(50% - 10px)'
                                                                      }}
                />}
                {(blogs.length === 0 && !pending)
                    ? <ListItem>
                        <ListItemText>
                            {emptyLabel}
                        </ListItemText>
                    </ListItem>
                    : blogs.map(blog =>
                        (<DrawerLinkToBlog blogName={blog.name}
                                           blogId={blog.id}
                                           blogLetterAvatarColor={blog.letterAvatarColor}
                                           blogAvatarUri={blog.avatarUri}
                                           onClick={this.handleClick}
                        />)
                    )
                }
            </List>
        )
    }
}

BlogList.propTypes = {
    blogs: PropTypes.array,
    pending: PropTypes.bool,
    emptyLabel: PropTypes.string,
    onItemClick: PropTypes.func
};

export default BlogList;

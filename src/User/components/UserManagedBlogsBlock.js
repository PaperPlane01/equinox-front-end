import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import {Link} from "mobx-router";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "../../Avatar";
import views from "../../router-config";
import {withLocale} from "../../localization";

@withLocale
@inject('store')
@inject('userManagedBlogsStore')
@observer
class UserManagedBlogsBlock extends React.Component {
    renderCardContent() {
        const {userManagedBlogsStore, l, store} = this.props;
        const {managedBlogsHolder} = userManagedBlogsStore;
        const {ownedBlogs, managedBlogs} = managedBlogsHolder;

        return (
            <React.Fragment>
                {ownedBlogs.length !== 0 && (
                    <React.Fragment>
                        <List>
                            {ownedBlogs.map(blog => (
                                <Link view={views.blog}
                                      params={{id: blog.id}}
                                      style={{textDecoration: 'none'}}
                                      store={store}
                                >
                                    <ListItem>
                                        <Avatar avatarUri={blog.avatarUri}
                                                avatarColor={blog.letterAvatarColor}
                                                avatarLetter={blog.name[0]}
                                        />
                                        <ListItemText>
                                            {`${blog.name} — ${l('owner')}`}
                                        </ListItemText>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                        <Divider/>
                    </React.Fragment>
                )}
                {managedBlogs.length !== 0 && (
                    <List>
                        {managedBlogs.map(managedBlog => (
                            <Link view={views.blog}
                                  params={{id: managedBlog.blog.id}}
                                  style={{textDecoration: 'none'}}
                                  store={store}
                            >
                                <ListItem>
                                    <Avatar avatarUri={managedBlog.blog.avatarUri}
                                            avatarColor={managedBlog.blog.letterAvatarColor}
                                            avatarLetter={managedBlog.blog.name[0]}
                                    />
                                    <ListItemText>
                                        {`${managedBlog.blog.name} — ${l(managedBlog.blogRole)}`}
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                )}
            </React.Fragment>
        )
    }

    render() {
        const {pending, userManagedBlogsStore, l} = this.props;
        const {ownedBlogs, managedBlogs} = userManagedBlogsStore.managedBlogsHolder;

        if (pending || (ownedBlogs.length === 0 && managedBlogs.length === 0)) {
            return null;
        }

        return (
            <Card>
                <CardHeader title={l('managedBlogs')}/>
                <CardContent>
                    {this.renderCardContent()}
                </CardContent>
            </Card>
        )
    }
}

UserManagedBlogsBlock.propTypes = {
    userManagedBlogsStore: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func
};

export default UserManagedBlogsBlock;
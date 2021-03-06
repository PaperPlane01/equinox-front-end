import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditBlogMenuItem from './EditBlogMenuItem';
import EditBlogDialog from './EditBlogDialog';
import BlockedUsersInBlogMenuItem from './BlockedUsersInBlogMenuItem';
import {canEditBlog, canSeeBlockedUsers} from "../permissions";

@inject('authStore')
@observer
class BlogActionsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorElement: undefined
        }
    };

    openMenu = event => {
        this.setState({
            anchorElement: event.currentTarget
        })
    };

    closeMenu = () => {
        this.setState({anchorElement: null});
    };

    render() {
        const {authStore, blog} = this.props;
        const items = [];

        canEditBlog(authStore.currentUser, blog) && items.push(<EditBlogMenuItem onClick={this.closeMenu}/>);
        canSeeBlockedUsers(authStore.currentUser, blog.id)
        && items.push(<BlockedUsersInBlogMenuItem onClick={this.closeMenu}
                                                  blogId={blog.id}
        />);

        if (items.length !== 0) {
            const menuId = `blogActionsMenu-${blog.id}`;
            const {anchorElement} = this.state;

            return <div>
                <IconButton onClick={this.openMenu}>
                    <MoreVertIcon/>
                </IconButton>
                <Menu id={menuId}
                      anchorEl={anchorElement}
                      open={Boolean(anchorElement)}
                      onClose={this.closeMenu}
                      anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                      transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                      }}
                >
                    {items}
                </Menu>
                {canEditBlog(authStore.currentUser, blog) && <EditBlogDialog/>}
            </div>
        } else {
            return null;
        }
    }
}

BlogActionsMenu.propTypes = {
    authStore: PropTypes.object,
    blog: PropTypes.object
};

export default BlogActionsMenu;
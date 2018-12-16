import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditBlogManagerMenuItem from './EditBlogManagerMenuItem';
import EditBlogManagerDialog from './EditBlogManagerDialog';
import DeleteBlogManagerMenuItem from './DeleteBlogManagerMenuItem';
import DeleteBlogManagerDialog from './DeleteBlogManagerDialog';
import {canUpdateBlogManager, canDeleteBlogManager} from "../permissions";

@inject('authStore')
@inject('updateBlogManagerStore')
@inject('deleteBlogManagerStore')
@observer
class BlogManagerActionsMenu extends React.Component {
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
        const {authStore, blogManager, updateBlogManagerStore, deleteBlogManagerStore} = this.props;
        const {currentUser} = authStore;
        const {blogId, blogManagerId} = blogManager;

        const _canDeleteBlogManager = canDeleteBlogManager(currentUser, blogId);
        const _canUpdateBlogManager = canUpdateBlogManager(currentUser, blogId);

        const items = [];

        _canDeleteBlogManager && items.push(<DeleteBlogManagerMenuItem managerId={blogManagerId}
                                                                       onClick={this.closeMenu}
        />);
        _canUpdateBlogManager && items.push(<EditBlogManagerMenuItem managerId={blogManagerId}
                                                                     onClick={this.closeMenu}
        />);

        const shouldShowDeleteBlogManagerDialog
            = deleteBlogManagerStore.managerId === blogManager.blogManagerId;
        const shouldShowEditBlogManagerDialog
            = updateBlogManagerStore.managerId === blogManager.blogManagerId;

        if (items.length !== 0) {
            const menuId = `blogManagerActionMenu-${blogManagerId}`;
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
                {_canUpdateBlogManager && shouldShowEditBlogManagerDialog && <EditBlogManagerDialog/>}
                {_canDeleteBlogManager && shouldShowDeleteBlogManagerDialog && <DeleteBlogManagerDialog/>}
            </div>
        } else {
            return null;
        }
    }
}

BlogManagerActionsMenu.propTypes = {
    blogManager: PropTypes.object,
    authStore: PropTypes.object,
    updateBlogManagerStore: PropTypes.object,
    deleteBlogManagerStore: PropTypes.object
};

export default BlogManagerActionsMenu;
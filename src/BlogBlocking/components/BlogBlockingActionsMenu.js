import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UpdateBlogBlockingMenuItem from './UpdateBlogBlockingMenuItem';
import UpdateBlogBlockingDialog from './UpdateBlogBlockingDialog';
import UnblockUserMenuItem from './UnblockUserMenuItem';
import {canUpdateBlogBlocking, canDeleteBlogBlocking} from "../permissions";

@inject('updateBlogBlockingStore')
@inject('authStore')
@observer
class BlogBlockingActionsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorElement: null
        }
    }

    openMenu = event => {
        this.setState({anchorElement: event.target});
    };

    closeMenu = () => {
        this.setState({anchorElement: null});
    };

    render() {
        const {authStore, blogBlocking, updateBlogBlockingStore} = this.props;

        const _canUpdateBlogBlocking = canUpdateBlogBlocking(authStore.currentUser, blogBlocking);
        const _canDeleteBlogBlocking = canDeleteBlogBlocking(authStore.currentUser, blogBlocking);

        const items = [];

        _canUpdateBlogBlocking && items.push(<UpdateBlogBlockingMenuItem onClick={this.closeMenu}
                                                                         blogBlockingId={blogBlocking.id}
        />);
        _canDeleteBlogBlocking && items.push(<UnblockUserMenuItem onClick={this.closeMenu}
                                                                  blogBlockingId={blogBlocking.id}
            />
        );

        if (items.length !== 0) {
            const menuId = `blogBlockingMenu-${blogBlocking.id}`;
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
                {_canUpdateBlogBlocking
                && updateBlogBlockingStore.blogBlockingId === blogBlocking.id
                && <UpdateBlogBlockingDialog/>}
            </div>
        } else {
            return null;
        }
    }
}

BlogBlockingActionsMenu.propTypes = {
    authStore: PropTypes.object,
    updateBlogBlockingStore: PropTypes.object,
    blogBlocking: PropTypes.object
};

export default BlogBlockingActionsMenu;
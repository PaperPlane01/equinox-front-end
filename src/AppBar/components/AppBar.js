import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {default as MaterialUiAppBar} from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import withStyles from '@material-ui/core/styles/withStyles';
import HeadRoom from 'react-headroom';
import {Link} from 'mobx-router';
import Drawer from './Drawer';
import CurrentUserBlogsAppBarMenu from "./CurrentUserBlogsAppBarMenu";
import CurrentUserSubscriptionsAppBarMenu from "./CurrentUserSubscriptionsAppBarMenu";
import FeedAppBarItem from "./FeedAppBarItem";
import {SearchBlogPostsQueryTextField} from "../../BlogPost/components";
import {NotificationsHolder} from "../../Notification";
import {UserMenuAppBar} from "../../User/components";
import views from "../../router-config";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

@inject('authStore')
@inject('store')
@inject('appBarStore')
@observer
class AppBar extends React.Component {
    render() {
        const {title, store, appBarStore, authStore, classes} = this.props;
        const {currentUser} = authStore;

        const linkToHome = (<Link store={store}
                                  view={views.home}
                                  style={{
                                      textDecoration: 'none',
                                      color: 'inherit'
                                  }}
        >
            Aphelion
        </Link>);

        return <HeadRoom style={{
            position: 'fixed',
            zIndex: 1300
        }}>
            <MaterialUiAppBar position="static" classes={classes} >
                <Toolbar>
                    <IconButton className={classes.menuButton}
                                color="inherit"
                                aria-label="Menu"
                                onClick={() => appBarStore.setDrawerOpened(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="headline" color="inherit" className={classes.grow}>
                        <Hidden xsDown>
                            {title ?  (
                                    <span>
                                {linkToHome} | {title}
                            </span>
                                )
                                : linkToHome
                            }
                        </Hidden>
                    </Typography>
                    <React.Fragment>
                        <Hidden smDown>
                            <SearchBlogPostsQueryTextField/>
                        </Hidden>
                        {currentUser && (
                            <React.Fragment>
                                <FeedAppBarItem/>
                                <CurrentUserSubscriptionsAppBarMenu/>
                                <CurrentUserBlogsAppBarMenu/>
                                <NotificationsHolder/>
                            </React.Fragment>
                        )}
                    <UserMenuAppBar/>
                    </React.Fragment>
                </Toolbar>
            </MaterialUiAppBar>
            <Drawer/>
        </HeadRoom>
    }
}

AppBar.propTypes = {
    title: PropTypes.string,
    classes: PropTypes.object,
    store: PropTypes.object,
    appBarStore: PropTypes.object,
};

export default withStyles(styles)(AppBar);
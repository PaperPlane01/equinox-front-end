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
import views from '../../router-config';
import {UserMenuAppBar} from '../../User';
import {NotificationsHolder} from '../../Notification';
import {SearchBlogPostsQueryTextField} from '../../BlogPost';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';

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

@inject('store')
@inject('appBarStore')
@observer
class AppBar extends React.Component {
    render() {
        const {title, store, appBarStore, classes} = this.props;

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
                        {title ? <span>
                                {linkToHome}{` | ${title}`}
                                </span>
                            : linkToHome
                        }
                    </Typography>
                    <Hidden smDown>
                        <SearchBlogPostsQueryTextField/>
                    </Hidden>
                    <NotificationsHolder/>
                    <UserMenuAppBar/>
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
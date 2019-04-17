import React from "react";
import PropTypes from "prop-types";
import {observer, inject} from "mobx-react";
import Popover from "@material-ui/core/Popover";
import Hidden from "@material-ui/core/Hidden";
import ViewListIcon from "@material-ui/icons/ViewList";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import BlogList from "./BlogList";
import {withLocale} from "../../localization";

@withLocale
@inject('currentUserBlogsStore')
@observer
class CurrentUserBlogsAppBarMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorElement: null
        }
    }

    openMenu = event => {
        const {currentUserBlogsStore} = this.props;
        const {initiallyLoaded} = currentUserBlogsStore;

        if (!initiallyLoaded) {
            currentUserBlogsStore.fetchBlogsOwnedByCurrentUser();
        }
        this.setState({anchorElement: event.target});
    };

    closeMenu = () => {
        this.setState({anchorElement: null});
    };

    render() {
        const {anchorElement} = this.state;
        const {currentUserBlogsStore, l} = this.props;
        const {blogs, pending} = currentUserBlogsStore;

        return (
            <div>
                <Hidden mdUp>
                    <IconButton onClick={this.openMenu}
                                color="inherit"
                    >
                        <ViewListIcon/>
                    </IconButton>
                </Hidden>
                <Hidden smDown>
                    <Button onClick={this.openMenu}
                            color="inherit"
                    >
                        <ViewListIcon style={{marginRight: 5}}/>
                        {l('myBlogs')}
                    </Button>
                </Hidden>
                <Popover open={Boolean(anchorElement)}
                         onClose={this.closeMenu}
                         anchorEl={anchorElement}
                         anchorOrigin={{
                             vertical: 'bottom',
                             horizontal: 'center',
                         }}
                         transformOrigin={{
                             vertical: 'top',
                             horizontal: 'center',
                         }}
                         PaperProps={{
                             style: {
                                 maxHeight: 48 * 4.5,
                                 width: 200,
                             },
                         }}
                >
                    <BlogList pending={pending}
                              blogs={blogs}
                              emptyLabel={l('youDontHaveAnyBlogs')}
                              onItemClick={this.closeMenu}
                    />
                </Popover>
            </div>
        )
    }
}

CurrentUserBlogsAppBarMenu.propTypes = {
    currentUserBlogsStore: PropTypes.object,
    l: PropTypes.func
};

export default CurrentUserBlogsAppBarMenu;
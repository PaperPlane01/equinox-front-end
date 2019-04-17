import React from "react";
import PropTypes from "prop-types";
import {Link} from "mobx-router";
import {inject, observer} from "mobx-react";
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import views from "../../router-config";
import {withLocale} from "../../localization";

@withLocale
@inject('store')
@observer
class FeedAppBarItem extends React.Component {
    render() {
        const {l, store} = this.props;

        return (
            <Link view={views.feed}
                  store={store}
                  style={{
                      textDecoration: 'none',
                      color: 'inherit'
                  }}
            >
                <Hidden mdUp>
                    <IconButton color="inherit">
                        <RssFeedIcon/>
                    </IconButton>
                </Hidden>
                <Hidden smDown>
                    <Button color="inherit">
                        <RssFeedIcon/>
                        {l('feed')}
                    </Button>
                </Hidden>
            </Link>
        )
    }
}

FeedAppBarItem.propTypes = {
    store: PropTypes.object,
    l: PropTypes.func
};

export default FeedAppBarItem;
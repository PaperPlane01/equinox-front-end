import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {FeedList} from "../BlogPost";
import AppBar from '../AppBar';
import {withLocale} from "../localization";
import {LoadMoreBlogPostsButton} from "../BlogPost";

@withLocale
@inject('authStore')
@observer
class Feed extends React.Component {
    render() {
        const {authStore, l} = this.props;

        return <Grid container>
            <Grid item xs={12}>
                <AppBar title={l('feed')}/>
            </Grid>
            <Grid item xs={1} lg={2}/>
            <Grid item xs={10} lg={8}>
                <div style={{
                    marginTop: '16px',
                    width: '100%'
                }}>
                    {authStore.loggedIn
                        ? <Grid container spacing={16}>
                            <Grid item xs={12}>
                                <FeedList/>
                            </Grid>
                            <Grid item xs={12}>
                                <LoadMoreBlogPostsButton source="feedStore"/>
                            </Grid>
                        </Grid>
                        : <Typography variant="headline">
                            {l('loginRequired')}
                        </Typography>}
                </div>
            </Grid>
        </Grid>
    }
}

Feed.propTypes = {
    l: PropTypes.func,
    authStore: PropTypes.object
};

export default Feed;
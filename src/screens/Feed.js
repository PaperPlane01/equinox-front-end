import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {FeedList} from "../BlogPost";
import AppBar from '../AppBar';
import StandardLayout from '../StandardLayout';
import {withLocale} from "../localization";
import {LoadMoreBlogPostsButton} from "../BlogPost";

@withLocale
@inject('authStore')
@observer
class Feed extends React.Component {
    render() {
        const {authStore, l} = this.props;
        const content = (<div style={{
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
                    </Typography>
                }
            </div>
        );


        return <Grid container>
            <Grid item xs={12}>
                <AppBar title={l('feed')}/>
            </Grid>
            <StandardLayout>
                {content}
            </StandardLayout>
        </Grid>
    }
}

Feed.propTypes = {
    l: PropTypes.func,
    authStore: PropTypes.object
};

export default Feed;
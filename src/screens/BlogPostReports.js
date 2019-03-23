import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import Grid from '@material-ui/core/Grid';
import AppBar from '../AppBar';
import StandardLayout from '../StandardLayout';
import {
    BlogPostReportsTable,
    BlogPostReportsTableStickyFooter,
    BlogPostReportsSnackBarContainer,
    BlockSelectedBlogPostsAuthorsDialog,
    canSeeBlogPostReports
} from "../BlogPostReport";
import {withLocale} from "../localization";
import Typography from "@material-ui/core/Typography";

@withLocale
@inject('authStore')
@observer
class BlogPostReports extends React.Component {
    render() {
        const {authStore, l} = this.props;
        const {currentUser} = authStore;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <AppBar title={l('blogPostReports')}/>
                </Grid>
                <Grid item xs={12}>
                    <StandardLayout>
                        {canSeeBlogPostReports(currentUser)
                            ? (
                                <div>
                                    <BlogPostReportsTable/>
                                </div>
                            )
                            : <Typography variant="headline">{l('accessToPageDenied')}</Typography>
                        }
                    </StandardLayout>
                    <BlogPostReportsTableStickyFooter/>
                    <BlogPostReportsSnackBarContainer/>
                    <BlockSelectedBlogPostsAuthorsDialog/>
                </Grid>
            </Grid>
        )
    }
}

BlogPostReports.propTypes = {
    authStore: PropTypes.object,
    l: PropTypes.func
};

export default BlogPostReports;

import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StickyFooter from 'react-sticky-footer';
import BlockBlogPostsAuthorsButton from './BlockBlogPostsAuthorsButton';
import DeleteBlogPostsButton from './DeleteBlogPostsButton';
import RejectBlogPostReportsButton from './RejectBlogPostReportsButton';
import ClearBlogPostReportsSelectionButton from './ClearBlogPostReportsSelectionButton';
import {withLocale} from "../../localization";

@withLocale
@inject('blogPostReportListStore')
@observer
class BlogPostReportsTableStickyFooter extends React.Component {
    render() {
        const {blogPostReportListStore, l} = this.props;
        const {selectedBlogPostReports} = blogPostReportListStore;

        if (selectedBlogPostReports.length === 0) {
            return null;
        }

        return (
            <StickyFooter stickyStyles={{
                width: '100%'
            }}>
                <Card raised>
                    <CardContent>
                        <Typography variant="headline">
                            {l('selected')}: {selectedBlogPostReports.length}
                            <div style={{
                                display: 'inline',
                                float: 'right'
                            }}>
                                <ClearBlogPostReportsSelectionButton/>
                            </div>
                        </Typography>
                        <Grid container
                              alignItems="center"
                        >
                            <Grid item xs={4} style={{textAlign: 'center'}}>
                                <BlockBlogPostsAuthorsButton/>
                            </Grid>
                            <Grid item xs={4} style={{textAlign: 'center'}}>
                                <DeleteBlogPostsButton/>
                            </Grid>
                            <Grid item xs={4} style={{textAlign: 'center'}}>
                                <RejectBlogPostReportsButton/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </StickyFooter>
        )
    }
}

BlogPostReportsTableStickyFooter.propTypes = {
    blogPostReportListStore: PropTypes.object,
    l: PropTypes.func
};

export default BlogPostReportsTableStickyFooter;

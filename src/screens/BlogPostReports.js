import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '../AppBar';
import StandardLayout from '../StandardLayout';
import {BlogPostReportsTable} from "../BlogPostReport";

export default class BlogPostReports extends React.Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <AppBar/>
                </Grid>
                <Grid item xs={12}>
                    <StandardLayout>
                        <BlogPostReportsTable/>
                    </StandardLayout>
                </Grid>
            </Grid>
        )
    }
}

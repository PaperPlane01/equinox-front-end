import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {UpdateBlogPostForm} from "../BlogPost";
import AppBar from '../AppBar';
import StandardLayout from '../StandardLayout';
import {withLocale} from "../localization";

@withLocale
class EditBlogPost extends React.Component {
    render() {
        const {l} = this.props;

        return <Grid container>
            <Grid item xs={12}>
                <AppBar title={l('updateBlogPost')}/>
            </Grid>
            <Grid item xs={12}>
                <StandardLayout>
                    <UpdateBlogPostForm/>
                </StandardLayout>
            </Grid>
        </Grid>
    }
}

EditBlogPost.propTypes = {
    l: PropTypes.func
};

export default EditBlogPost;
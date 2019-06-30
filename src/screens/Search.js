import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import StandardLayout from '../StandardLayout';
import AppBar from '../AppBar';
import {SearchBlogPostsList, SearchBlogPostsForm} from "../BlogPost";
import {withLocale} from "../localization";

@withLocale
class Search extends React.Component {
    render() {
        const {l} = this.props;

        return <Grid container>
            <Grid item xs={12}>
                <AppBar title={l('search')}/>
            </Grid>
            <Grid item xs={12} style={{marginTop: 16}}>
                <StandardLayout>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <SearchBlogPostsForm/>
                        </Grid>
                        <Grid item xs={12}>
                            <SearchBlogPostsList/>
                        </Grid>
                    </Grid>
                </StandardLayout>
            </Grid>
        </Grid>
    }
}

Search.propTypes = {
    l: PropTypes.func
};

export default Search;
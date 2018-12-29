import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '../AppBar'
import StandardLayout from '../StandardLayout';
import {CreateBlogForm} from "../Blog";
import {withLocale} from "../localization";

@withLocale
@inject('authStore')
@observer
class CreateBlog extends React.Component {
    render() {
        const {authStore, l} = this.props;

        return <Grid container>
            <Grid container>
                <Grid item xs={12}>
                    <AppBar title={l('createBlog')}/>
                </Grid>
                <StandardLayout>
                    {authStore.loggedIn
                        ? <Card raised
                                style={{
                                    marginTop: '18px',
                                }}
                        >
                            <CardContent>
                                <CreateBlogForm/>
                            </CardContent>
                        </Card>
                        : <Typography variant="headline">
                            {l('loginRequired')}
                        </Typography>}
                </StandardLayout>
            </Grid>
        </Grid>
    }
}

CreateBlog.propTypes = {
    authStore: PropTypes.object,
    l: PropTypes.func
};

export default CreateBlog;
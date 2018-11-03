import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '../AppBar'
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
                <Grid item xs={1} lg={2}/>
                <Grid item xs={10} lg={8}>
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
                </Grid>
                <Grid item lg={2}/>
            </Grid>
        </Grid>
    }
}

CreateBlog.propTypes = {
    authStore: PropTypes.object,
    l: PropTypes.func
};

export default CreateBlog;
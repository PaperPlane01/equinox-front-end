import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from 'mobx-router';
import views from '../router-config';
import AppBar from '../AppBar';
import StandardLayout from '../StandardLayout';
import {MostPopularBlogPostsList} from "../BlogPost";
import {withLocale} from "../localization";

@withLocale
@inject('store')
@observer
class Home extends React.Component {
    render() {
        const {store, l} = this.props;

        return <Grid container>
            <Grid item xs={12}>
                <AppBar/>
            </Grid>
            <StandardLayout>
                <Grid container
                      spacing={16}
                >
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="headline">
                                    {l('welcomeToBloggingApp')}
                                </Typography>
                                <Typography variant="body1">
                                    {l('welcomeMessageBeforeLink')}<Link view={views.createBlog} store={store}>{l('createYourOwn')}</Link>{l('welcomeMessageAfterLink')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <MostPopularBlogPostsList/>
                    </Grid>
                </Grid>
            </StandardLayout>
        </Grid>
    }
}

Home.propTypes = {
    store: PropTypes.object,
    l: PropTypes.func
};

export default Home;
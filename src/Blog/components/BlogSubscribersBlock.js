import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'mobx-router';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {withLocale} from "../../localization";
import views from '../../router-config';

@withLocale
@inject('blogSubscribersBlockStore')
@inject('store')
@observer
class BlogSubscribersBlock extends React.Component {
    renderCardContent = () => {
        const {blogSubscribersBlockStore, store, l} = this.props;
        const {pending, subscribers} = blogSubscribersBlockStore;

        if (pending) {
            return <CircularProgress size={25} color="primary"/>
        }

        if (subscribers.length === 0) {
            return <Typography variant="subtitle">
                {l('noSubscribers')}
            </Typography>
        } else {
            return <Grid container spacing={8}>
                {subscribers.map(subscriber => (
                    <Grid item xs={4}>
                        <Link view={views.userProfile}
                              params={{id: subscriber.id}}
                              store={store}
                              style={{
                                  textDecoration: 'none'
                              }}
                        >
                            <Grid container>
                                <Grid item xs={12}>
                                    {subscriber.avatarUri
                                        ? <Avatar src={subscriber.avatarUri}
                                                  imgProps={{
                                                      width: '100%',
                                                      height: '100%'
                                                  }}
                                                  style={{
                                                      marginLeft: '25%'
                                                  }}
                                        /> : <Avatar imgProps={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                                     style={{
                                                         backgroundColor: subscriber.letterAvatarColor,
                                                         alignSelf: 'center',
                                                         marginLeft: '25%'
                                                     }}>
                                            {subscriber.displayedName[0]}
                                        </Avatar>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1"
                                                style={{
                                                    wordWrap: 'break-word',
                                                    marginLeft: '25%'
                                                }}
                                    >
                                        {subscriber.displayedName}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Link>
                    </Grid>
                ))}
                </Grid>
        }
    };

    render() {
        const {l, blogSubscribersBlockStore} = this.props;
        const {subscribers} = blogSubscribersBlockStore;

        return <Card>
            <CardHeader title={`${l('subscribers')}: ${subscribers.length}`}/>
            <CardContent>
                {this.renderCardContent()}
            </CardContent>
        </Card>
    }
}

BlogSubscribersBlock.propTypes = {
    l: PropTypes.func,
    store: PropTypes.object,
    blogSubscribersBlockStore: PropTypes.object
};

export default BlogSubscribersBlock;
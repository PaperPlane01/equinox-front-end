import React from "react";
import PropTypes from "prop-types";
import {observer, inject} from "mobx-react";
import _ from "lodash";
import {Link} from "mobx-router";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Avatar from "../../Avatar";
import {withLocale} from "../../localization";
import views from "../../router-config";

@withLocale
@inject('store')
@inject('userSubscriptionsStore')
@observer
class UserSubscriptionsBlock extends React.Component {
    renderCardContent() {
        const {userSubscriptionsStore, l, store} = this.props;
        const {subscriptions, pending} = userSubscriptionsStore;

        if (pending) {
            return <CircularProgress size={25} color="primary"/>
        }

        if (subscriptions.length === 0) {
            return <Typography variant="body1">{l('userDoesNotHaveSubscriptions')}</Typography>
        }

        const shuffledSubscriptions = _.shuffle(subscriptions).slice(0, 5);

        return (
            <Grid container spacing={8}>
                {shuffledSubscriptions.map(subscription => (
                    <Grid item xs={4}>
                        <Link view={views.blog}
                              params={{id: subscription.blog.id}}
                              store={store}
                              style={{textDecoration: 'none'}}
                        >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Avatar avatarUri={subscription.blog.avatarUri}
                                            avatarLetter={subscription.blog.name[0]}
                                            avatarColor={subscription.blog.letterAvatarColor}
                                            style={{
                                                alignSelf: 'center',
                                                marginLeft: '25%'
                                            }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1"
                                                style={{
                                                    wordWrap: 'break-word',
                                                    marginLeft: '25%'
                                                }}
                                    >
                                        {subscription.blog.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        )
    }

    render() {
        const {l} = this.props;

        return (
            <Card>
                <CardHeader title={l('subscriptions')}/>
                <CardContent>
                    {this.renderCardContent()}
                </CardContent>
            </Card>
        )
    }
}

UserSubscriptionsBlock.propTypes = {
    userSubscriptionsStore: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func
};

export default UserSubscriptionsBlock;
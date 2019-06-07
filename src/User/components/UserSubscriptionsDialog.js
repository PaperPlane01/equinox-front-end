import React from "react";
import PropTypes from "prop-types";
import {observer, inject} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import {LinkToBlog} from "../../Blog";
import {withLocale} from "../../localization";

@withLocale
@inject('userSubscriptionsStore')
@observer
class UserSubscriptionsDialog extends React.Component {
    renderDialogContent() {
        const {userSubscriptionsStore, l} = this.props;
        const {subscriptions, pending} = userSubscriptionsStore;

        if (pending && subscriptions.length === 0) {
            return <CircularProgress color="primary"
                                     size={50}
                                     style={{
                                         marginLeft: 'calc(50% - 50px)',
                                     }}
            />
        }

        if (subscriptions.length === 0) {
            return <Typography variant="body1">
                {l('userDoesNotHaveSubscriptions')}
            </Typography>
        }

        return (
            <React.Fragment>
                {subscriptions.map(subscription => (
                    <LinkToBlog blogName={subscription.blog.name}
                                blogLetterAvatarColor={subscription.blog.letterAvatarColor}
                                blogAvatarUri={subscription.blog.avatarUri}
                                blogId={subscription.blog.id}
                                onClick={() => userSubscriptionsStore.setSubscriptionsDialogOpen(false)}
                    />
                ))}
                {pending && <CircularProgress color="primary"
                                              size={50}
                                              style={{
                                                  marginLeft: 'calc(50% - 50px)',
                                              }}
                />}
            </React.Fragment>
        )
    }

    render() {
        const {l, fullScreen, userSubscriptionsStore} = this.props;
        const {subscriptionsDialogOpen} = userSubscriptionsStore;

        return (
            <Dialog open={subscriptionsDialogOpen}
                    onClose={() => userSubscriptionsStore.setSubscriptionsDialogOpen(false)}
                    fullScreen={fullScreen}
                    fullWidth
            >
                <DialogTitle>
                    {l('subscriptions')}
                </DialogTitle>
                <DialogContent>
                    {this.renderDialogContent()}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained"
                            color="primary"
                            onClick={userSubscriptionsStore.fetchSubscriptions}
                            style={{float: 'right'}}
                    >
                        {l('loadMore')}
                    </Button>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => userSubscriptionsStore.setSubscriptionsDialogOpen(false)}
                    >
                        {l('close')}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

UserSubscriptionsDialog.propTypes = {
    userSubscriptionsStore: PropTypes.object,
    l: PropTypes.bool,
    fullScreen: PropTypes.bool
};

export default withMobileDialog()(UserSubscriptionsDialog);
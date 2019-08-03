import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "../AppBar";
import StandardLayout from "../StandardLayout";
import {withLocale} from "../localization";

@withLocale
@inject('confirmEmailStore')
@inject('authStore')
@observer
class ConfirmEmail extends React.Component {
    renderContent() {
        const {authStore, confirmEmailStore, l} = this.props;
        const {loggedIn} = authStore;
        const {pending, successResponse, error} = confirmEmailStore;

        if (!loggedIn) {
            return (
                <Typography variant="headline">
                    {l('loginRequiredForEmailConfirmation')}
                </Typography>
            )
        }

        if (successResponse) {
            return (
                <Typography variant="headline">
                    {l('emailConfirmationSuccess')}
                </Typography>
            )
        }

        if (error) {
            let errorText = undefined;
            if (error.exception === 'EmailConfirmationExpiredException') {
                errorText = l('emailConfirmationExpired')
            } else if (error.exception === 'EmailConfirmationHasAlreadyBeenActivatedException') {
                errorText = l('emailConfirmationHasAlreadyBeenActivated');
            } else if (error.status === 403 || error.status === 401) {
                errorText = l('emailConfirmationLinkBelongsToDifferentUser');
            } else if (error.status === 404) {
                errorText = l('emailConfirmationLinkIsNotValid');
            } else {
                errorText = l('errorWhenAttemptedToConfirmEmail', {errorStatus: error.status});
            }

            return (
                <Typography variant="headline">
                    {errorText}
                </Typography>
            )
        }

        return (
            <React.Fragment>
                <Typography variant="headline">
                    {l('confirmingEmail')}
                </Typography>
                <CircularProgress color="primary" size={20}/>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <AppBar/>
                    </Grid>
                    <Grid item xs={12}>
                        <StandardLayout>
                            {this.renderContent()}
                        </StandardLayout>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

ConfirmEmail.propTypes = {
    authStore: PropTypes.object,
    confirmEmailStore: PropTypes.object,
    l: PropTypes.func
};

export default ConfirmEmail;

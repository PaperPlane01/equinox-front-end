import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import {snackBarHelper} from "../../snack-bar-helper";
import {withLocale} from "../../localization";

@withLocale
@snackBarHelper({
    errorLabel: 'errorWhenAttemptedToUpdateEmail',
    errorPropertyName: 'error',
    storeName: 'updateEmailStore',
    successLabel: 'emailUpdatedSuccessfully'
})
@inject('updateEmailStore')
@observer
class UpdateEmailForm extends React.Component {
    render() {
        const {updateEmailStore, l} = this.props;
        const {updateEmailForm, setEmail, updateEmail, formErrors, fetchingEmail, submitting} = updateEmailStore;

        return (
            <React.Fragment>
                <Typography variant="headline">
                    {l('changeEmail')}
                </Typography>
                <TextField value={updateEmailForm.email}
                           onChange={event => setEmail(event.target.value)}
                           error={Boolean(formErrors.email)}
                           helperText={formErrors.email && l(formErrors.email)}
                           margin="dense"
                           label={l('email')}
                           disabled={fetchingEmail}
                           fullWidth
                />
                <Button variant="contained"
                        color="primary"
                        onClick={updateEmail}
                >
                    {l('updateEmail')}
                </Button>
                {submitting && <CircularProgress size={20} color="primary"/>}
            </React.Fragment>
        )
    }
}

UpdateEmailForm.propTypes = {
    updateEmailStore: PropTypes.object,
    l: PropTypes.func
};

export default UpdateEmailForm;
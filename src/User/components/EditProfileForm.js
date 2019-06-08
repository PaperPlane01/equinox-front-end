import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {DatePicker} from 'material-ui-pickers';
import {withLocale} from "../../localization";

@withLocale
@inject('editProfileStore')
@observer
class EditProfileForm extends React.Component {
    render() {
        const {l, editProfileStore} = this.props;
        const {editProfileFormValues, editProfileFormErrors, pending, submissionError,
            persistedProfile} = editProfileStore;

        return <div>
            <Typography variant="headline">
                {l('editProfile')}
            </Typography>
            <TextField label={l('displayedName')}
                       value={editProfileFormValues.displayedName}
                       error={Boolean(editProfileFormErrors.displayedName)}
                       helperText={editProfileFormErrors.displayedName && l(editProfileFormErrors.displayedName)}
                       onChange={event => editProfileStore.setEditProfileFormValue(event.target.value, 'displayedName')}
                       fullWidth
                       margin="dense"
            />
            <TextField label={l('bio')}
                       value={editProfileFormValues.bio}
                       error={Boolean(editProfileFormErrors.bio)}
                       helperText={editProfileFormErrors.bio && l(editProfileFormErrors.bio)}
                       onChange={event => editProfileStore.setEditProfileFormValue(event.target.value, 'bio')}
                       fullWidth
                       margin="dense"
                       multiline
            />
            <TextField label={l('email')}
                       value={editProfileFormValues.email}
                       error={Boolean(editProfileFormErrors.email)}
                       helperText={editProfileFormErrors.email && l(editProfileFormErrors.email)}
                       onChange={event => editProfileStore.setEditProfileFormValue(event.target.value, 'email')}
                       fullWidth
                       margin="dense"
            />
            <TextField label={l('avatarUrl')}
                       value={editProfileFormValues.avatarUri}
                       error={Boolean(editProfileFormErrors.avatarUri)}
                       helperText={editProfileFormErrors.avatarUri && l(editProfileFormErrors.avatarUri)}
                       onChange={event => editProfileStore.setEditProfileFormValue(event.target.value, 'avatarUri')}
                       fullWidth
                       margin="dense"
            />
            <DatePicker label={l('birthDate')}
                        value={editProfileFormValues.birthDate}
                        onChange={date => {
                            console.log(date);
                            editProfileStore.setEditProfileFormValue(date, 'birthDate')
                        }}
                        autoOk
                        cancelLabel={l('cancel')}
                        disableFuture
                        openToYearSelection
                        fullWidth
                        minDate={Date.parse('01 Jan 1900')}
                        maxDate={new Date()}
                        format="DD-MM-YYYY"
                        clearable
                        clearLabel={l('clear')}
            />
            <Button variant="contained"
                    color="primary"
                    onClick={editProfileStore.updateUserProfile}
                    margin="normal"
            >
                {l('save')}
            </Button>
            {pending && <CircularProgress size={25} color="secondary"/>}
            {submissionError && <Typography variant="body1"
                                            style={{
                                                color: 'red'
                                            }}
            >
                {l('errorWhenAttemptedToUpdateProfile', {errorStatus: submissionError.status})}
            </Typography>}
            {persistedProfile && <Typography variant="body1"
                                             style={{
                                                 color: 'green'
                                             }}
            >
                {l('profileUpdated')}
            </Typography>}
        </div>
    }
}

EditProfileForm.propTypes = {
    l: PropTypes.func,
    editProfileStore: PropTypes.object
};

export default EditProfileForm;
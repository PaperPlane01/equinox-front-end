import {action, observable, reaction} from 'mobx';
import moment from 'moment';
import userValidators from '../validation';
import {Component} from "../../simple-ioc";
import {createErrorFromResponse, userService} from "../../Api";

@Component({
    dependencies: [
        {propertyName: 'authStore'}
    ]
})
class EditProfileStore {
    @observable editProfileFormValues = {
        displayedName: '',
        bio: '',
        birthDate: null,
        avatarUri: '',
        email: ''
    };
    @observable editProfileFormErrors = {
        displayedName: undefined,
        bio: undefined,
        birthDate: undefined,
        avatarUri: undefined,
        email: undefined
    };
    @observable pending = false;
    @observable submissionError = undefined;
    @observable fetchingError = undefined;
    @observable persistedProfile = undefined;
    @observable user = undefined;
    @observable authStore = undefined;

    constructor() {
        this.editProfileFormValues.displayedName = "";
        this.editProfileFormValues.avatarUri = "";
        this.editProfileFormValues.bio =  "";
        this.editProfileFormValues.email = "";
        this.editProfileFormValues.birthDate = null;

        reaction(
            () => this.authStore.currentUser,
            () => {
                if (this.authStore.currentUser && this.user) {
                    this.fetchCurrentUserProfile();
                }
            }
        );

        reaction(
            () => this.user,
            () => {
                if (this.user) {
                    this.editProfileFormValues.displayedName = this.user.displayedName;
                    this.editProfileFormValues.avatarUri = this.user.avatarUri;
                    this.editProfileFormValues.bio = this.user.bio;
                    this.editProfileFormValues.email = this.user.email;
                    this.editProfileFormValues.birthDate = this.user.birthDate
                        ? moment(this.user.birthDate)
                        : null;
                }
            }
        );

        reaction(
            () => this.editProfileFormValues.displayedName,
            displayedName => this.editProfileFormErrors.displayedName = userValidators.validateDisplayedUsername(displayedName)
        );

        reaction(
            () => this.editProfileFormValues.email,
            email => this.editProfileFormErrors.email = userValidators.validateEmail(email)
        );

        reaction(
            () => this.editProfileFormValues.bio,
            bio => this.editProfileFormErrors.bio = userValidators.validateBio(bio)
        );

        reaction(
            () => this.editProfileFormValues.avatarUri,
            avatarUri => userValidators.validateAvatarUri(avatarUri).then(result => {
                this.editProfileFormErrors.avatarUri = result;
            })
        );
    }

    @action validateAvatarUri = () => {
        this.editProfileFormErrors.avatarUri = userValidators.validateAvatarUri(this.editProfileFormValues.avatarUri)
            .then(result => this.editProfileFormErrors.avatarUri = result);
    };

    @action fetchCurrentUserProfile = () => {
        this.fetchingError = undefined;

        return userService.getFullProfileOfCurrentUser()
            .then(({data}) => {
                this.user = data;
            }).catch(({response}) => {
                this.fetchingError = createErrorFromResponse(response);
            });
    };

    @action setEditProfileFormValue = (value, propertyName) => {
        this.editProfileFormValues[propertyName] = value;
    };

    @action updateUserProfile = () => {
        if (this.isFormValid()) {
            this.pending = true;

            return userService.updateCurrentUser(this.editProfileFormValues)
                .then(({data}) => {
                    this.persistedProfile = data;
                }).catch((response) => {
                    this.submissionError = createErrorFromResponse(response);
                }).then(() => {
                    this.pending = false;
                });
        } else {
            console.log('form is invalid');
        }
    };

    isFormValid = () => {
        this.editProfileFormErrors.displayedName = userValidators.validateDisplayedUsername(this.editProfileFormValues.displayedName);
        this.editProfileFormErrors.email = userValidators.validateEmail(this.editProfileFormValues.email);
        this.editProfileFormErrors.bio = userValidators.validateBio(this.editProfileFormValues.bio);

        const {displayedName, bio, birthDate, email, avatarUri} = this.editProfileFormErrors;
        return !(displayedName && bio && birthDate && email && avatarUri)
    };
}

export default EditProfileStore;
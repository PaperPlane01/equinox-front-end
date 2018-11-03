import {action, observable, reaction} from 'mobx';
import parseDate from 'date-fns/parse';
import addYears from 'date-fns/addYears';
import userValidators from '../../validation/index';
import Api, {createErrorFromResponse, Routes} from "../../../Api/index";

export default class EditProfileStore {
    @observable editProfileFormValues = {
        displayedName: '',
        bio: '',
        birthDate: undefined,
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
    @observable authStore;

    constructor(authStore) {
        this.editProfileFormValues.displayedName = "";
        this.editProfileFormValues.avatarUri = "";
        this.editProfileFormValues.bio =  "";
        this.editProfileFormValues.email = "";
        this.editProfileFormValues.birthDate = undefined;
        this.authStore = authStore;

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
                    this.editProfileFormValues.birthDate = addYears(parseDate(this.user.birthDate, "dd-MM-YYYY", new Date()), 1);
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
        return Api.get(`/${Routes.CURRENT_USER}/${Routes.FULL_PROFILE}`)
            .then(response => {
                this.user = response.data;
                this.fetchingError = undefined;
            }).catch(error => {
                this.fetchingError = createErrorFromResponse(error.response);
            });
    };

    @action setEditProfileFormValue = (value, propertyName) => {
        this.editProfileFormValues[propertyName] = value;
    };

    @action updateUserProfile = () => {
        if (this.isFormValid()) {
            this.pending = true;

            return Api.put(`/${Routes.CURRENT_USER}`, JSON.stringify({
                ...this.editProfileFormValues,
                birthDate: Date.UTC(this.editProfileFormValues.birthDate.getFullYear(),
                    this.editProfileFormValues.birthDate.getMonth(),
                    this.editProfileFormValues.birthDate.getDate())
            })).then(response => {
                    this.persistedProfile = response.data;
                    this.submissionError = undefined;
                }).catch(error => {
                    this.submissionError = createErrorFromResponse(error.response);
                }).then(() => {
                    this.pending = false;
                })
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
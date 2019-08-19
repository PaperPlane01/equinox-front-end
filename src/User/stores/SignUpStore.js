import {action, observable, reaction, computed} from 'mobx';
import _ from "lodash";
import {Component} from "../../simple-ioc";
import {createErrorFromResponse, userService} from '../../Api';
import validators from '../validation';
import {isBlank} from "../../utils";

@Component({
    dependencies: [
        {propertyName: 'localeStore'}
    ]
})
class SignUpStore {
    @observable signUpFormValues = {
        loginUsername: '',
        displayedUsername: '',
        email: '',
        password: '',
        repeatedPassword: ''
    };
    @observable signUpFormErrors = {
        loginUsername: undefined,
        displayedUsername: undefined,
        email: undefined,
        password: undefined,
        repeatedPassword: undefined
    };
    @observable submissionError = undefined;
    @observable submitting = false;
    @observable checkingUsername = false;
    @observable checkingEmail = false;
    @observable persistedUser = undefined;
    @observable signUpDialogOpen = false;
    @observable requireEmail = true;
    @observable localeStore = undefined;

    @computed
    get confirmationEmailLanguage() {
        return this.localeStore.currentLocale;
    }

    constructor() {
        reaction(
            () => this.signUpFormValues.loginUsername,
            () => {
                this.validateLoginUsername();
                const checkUsernameAvailabilityDebounced = _.debounce(this.checkUsernameAvailability, 300);
                checkUsernameAvailabilityDebounced();
            }
        );

        reaction(
            () => this.signUpFormValues.password,
            () => this.validatePassword()
        );

        reaction(
            () => this.signUpFormValues.repeatedPassword,
            () => {
                this.validatePassword();
                this.validateRepeatedPassword();
            }
        );

        reaction(
            () => this.signUpFormValues.displayedUsername,
            () => this.validateDisplayedUsername()
        );

        reaction(
            () => this.signUpFormValues.email,
            () => {
                this.validateEmail();
                const checkEmailAvailabilityDebounced = _.debounce(this.checkEmailAvailability, 300);
                checkEmailAvailabilityDebounced();
            }
        )
    }

    @action
    setSignUpFormValue = (propertyName, value) => {
        this.signUpFormValues[propertyName] = value;
    };

    @action
    setRequireEmail = requireEmail => {
        this.requireEmail = requireEmail;
    };

    @action
    validateLoginUsername = () => {
        this.signUpFormErrors.loginUsername = validators.validateLoginUsernameForSignUp(this.signUpFormValues.loginUsername);
    };

    @action
    validateDisplayedUsername = () => {
        this.signUpFormErrors.displayedUsername = validators.validateDisplayedUsername(this.signUpFormValues.displayedUsername);
    };

    @action
    validatePassword = () => {
        this.signUpFormErrors.password = validators.validatePassword(this.signUpFormValues.password);
    };

    @action
    validateRepeatedPassword = () => {
        this.signUpFormErrors.repeatedPassword = validators.validateRepeatedPassword(
            this.signUpFormValues.password, this.signUpFormValues.repeatedPassword
        );
    };

    @action
    validateEmail = () => {
        const {email} = this.signUpFormValues;
        this.signUpFormErrors.email = validators.validateEmail(email, this.requireEmail);
    };

    @action
    checkUsernameAvailability = () => {
        console.log('Checking username availability');
        const {loginUsername} = this.signUpFormValues;
        if (!isBlank(loginUsername) && !this.signUpFormErrors.loginUsername) {
            this.checkingUsername = true;
            return userService.checkUsernameAvailability(loginUsername)
                .catch(error => {
                    if (error.response && error.response.status === 409) {
                        this.signUpFormErrors.loginUsername = 'usernameIsAlreadyInUse';
                    }
                }).then(() => {
                    this.checkingUsername = false;
                })
        }
    };

    @action
    checkEmailAvailability = () => {
        const email = this.signUpFormValues.email;
        if (email && email !== '' && !this.signUpFormErrors.email) {
            this.checkingEmail = true;

            return userService.checkEmailAvailability(email)
                .catch(({response}) => {
                    if (response && response.status === 409) {
                        this.signUpFormErrors.email = 'emailIsAlreadyInUse';
                    }
                }).then(() => {
                    this.checkingEmail = false;
                })
        }
    };

    @action
    doSignUp = () => {
        if (this.isFormValid()) {
            this.submitting = true;

            return userService.save({
                ...this.signUpFormValues,
                confirmationEmailLanguage: this.confirmationEmailLanguage
            }, 'usernameAndPassword')
                .then(response => {
                    this.persistedUser = response.data;
                }).catch(error => {
                    this.submissionError = createErrorFromResponse(error.response);
                }).then(() => {
                    this.submitting = false;
                })
        }
    };

    isFormValid = () => {
        this.validateForm();

        const {loginUsername, password, repeatedPassword, displayedUsername, email} = this.signUpFormErrors;

        return !loginUsername && !password && !repeatedPassword && !displayedUsername && !(this.requireEmail && email);
    };

    @action
    validateForm() {
        this.validatePassword();
        this.validateRepeatedPassword();
        this.validateLoginUsername();
        this.validateDisplayedUsername();
    }

    @action
    setSignUpDialogOpen = open => {
        this.signUpDialogOpen = open;
    }
}

export default SignUpStore;
import {action, observable, reaction} from 'mobx';
import {Component} from "../../simple-ioc";
import {createErrorFromResponse, userService} from '../../Api';
import validators from '../validation';

@Component()
class SignUpStore {
    @observable signUpFormValues = {
        loginUsername: '',
        displayedUsername: '',
        password: '',
        repeatedPassword: ''
    };
    @observable signUpFormErrors = {
        loginUsername: undefined,
        displayedUsername: undefined,
        password: undefined,
        repeatedPassword: undefined
    };
    @observable submissionError = undefined;
    @observable submitting = false;
    @observable checkingUsername = false;
    @observable persistedUser = undefined;
    @observable signUpDialogOpen = false;

    constructor() {
        reaction(
            () => this.signUpFormValues.loginUsername,
            () => {
                this.validateLoginUsername();
                this.checkUsernameAvailability();
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
    }

    @action setSignUpFormValue = (value, propertyName) => {
        this.signUpFormValues[propertyName] = value;
    };

    @action validateLoginUsername = () => {
        this.signUpFormErrors.loginUsername = validators.validateLoginUsernameForSignUp(this.signUpFormValues.loginUsername);
    };

    @action validateDisplayedUsername = () => {
        this.signUpFormErrors.displayedUsername = validators.validateDisplayedUsername(this.signUpFormValues.displayedUsername);
    };

    @action validatePassword = () => {
        this.signUpFormErrors.password = validators.validatePassword(this.signUpFormValues.password);
    };

    @action validateRepeatedPassword = () => {
        this.signUpFormErrors.repeatedPassword = validators.validateRepeatedPassword(
            this.signUpFormValues.password, this.signUpFormValues.repeatedPassword
        );
    };

    @action checkUsernameAvailability = () => {
        const loginUsername = this.signUpFormValues.loginUsername;
        if (loginUsername && loginUsername !== '' && !this.signUpFormErrors.loginUsername) {
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

    @action doSignUp = () => {
        if (this.isFormValid()) {
            this.submitting = true;

            return userService.save(this.signUpFormValues, 'usernameAndPassword')
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

        const {loginUsername, password, repeatedPassword, displayedUsername} = this.signUpFormErrors;

        return !loginUsername && !password && !repeatedPassword && !displayedUsername;
    };

    @action validateForm() {
        this.validatePassword();
        this.validateRepeatedPassword();
        this.validateLoginUsername();
        this.validateDisplayedUsername();
    }

    @action setSignUpDialogOpen = open => {
        this.signUpDialogOpen = open;
    }
}

export default SignUpStore;
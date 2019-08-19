import {action, reaction, observable} from "mobx";
import {validateEmail} from "../validation";
import {Component} from "../../simple-ioc";
import {isBlank} from "../../utils";
import {createErrorFromResponse, userService} from "../../Api";

@Component({
    order: Component.Order.LOWEST,
    dependencies: [
        {propertyName: 'localeStore'}
    ]
})
class UpdateEmailStore {
    @observable
    updateEmailForm = {
        email: ''
    };

    @observable
    formErrors = {
        email: undefined
    };

    @observable
    currentUserEmail = undefined;

    @observable
    error = undefined;

    @observable
    submitting = false;

    @observable
    checkingEmail = true;

    @observable
    fetchingEmail = false;

    @observable
    fetchingEmailError = undefined;

    @observable
    showSnackBar = false;

    @observable
    successResponse = undefined;

    @observable
    localeStore = undefined;

    constructor() {
        reaction(
            () => this.updateEmailForm.email,
            email => {
                this.formErrors.email = validateEmail(email, false);
                if (email !== this.currentUserEmail) {
                    this.checkEmailAvailability();
                }
            }
        )
    }

    @action
    setEmail = email => {
        this.updateEmailForm.email = email;
    };

    @action
    checkEmailAvailability = () => {
        const email = this.updateEmailForm.email;

        if (!isBlank(email) && !this.formErrors.email) {
            this.checkingEmail = true;

            return userService.checkEmailAvailability(email)
                .catch(({response}) => {
                    if (response && response.status === 409) {
                        this.formErrors.email = 'emailIsAlreadyInUse';
                    }
                }).then(() => this.checkingEmail = false);
        }
    };

    @action
    fetchEmail = () => {
        this.fetchingEmail = true;
        this.fetchingEmailError = undefined;

        return userService.getEmailOfCurrentUser()
            .then(({data}) => {
                this.currentUserEmail = data.email;
                this.updateEmailForm.email = data.email;
            })
            .catch(({response}) => this.fetchingEmailError = createErrorFromResponse(response))
            .then(() => this.fetchingEmail = false);
    };

    @action
    updateEmail = () => {
        if (this.isFormValid()) {
            this.submitting = true;
            this.error = undefined;

            return userService.updateEmailOfCurrentUser(this.updateEmailForm.email, this.localeStore.currentLocale)
                .then(({data}) => this.successResponse = data)
                .catch(({response}) => this.error = createErrorFromResponse(response))
                .then(() => this.submitting = false)
                .then(() => this.showSnackBar = true);
        }
    };

    isFormValid = () => {
        return this.formErrors.email === undefined;
    };

    @action
    setShowSnackBar = showShackBar => {
        this.showSnackBar = showShackBar;
    }
}

export default UpdateEmailStore;
import {action, observable} from "mobx";
import {createErrorFromResponse, emailConfirmationService} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'authStore'}
    ]
})
class ConfirmEmailStore {
    @observable pending = false;
    @observable error = undefined;
    @observable authStore = undefined;
    @observable successResponse = undefined;

    @action
    confirmEmail = confirmationId => {
        if (this.authStore.loggedIn) {
            this.pending = true;

            emailConfirmationService.confirmEmail(confirmationId)
                .then(({data}) => this.successResponse = data)
                .catch(({response}) => this.error = createErrorFromResponse(response))
                .then(() => this.pending = false);
        }
    };

    @action
    reset = () => {
        this.pending = false;
        this.error = undefined;
        this.successResponse = undefined;
    }
}

export default ConfirmEmailStore;
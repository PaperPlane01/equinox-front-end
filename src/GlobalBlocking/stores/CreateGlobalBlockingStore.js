import {action, observable, reaction} from 'mobx';
import {validateReason, validateEndDate} from "../validation";
import {createErrorFromResponse, globalBlockingService} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    name: 'createGlobalBlockingStore',
    order: Component.Order.LOW
})
class GlobalBlockingStore {
    @observable globalBlockingDialogOpened = false;
    @observable globalBlockingFormValues = {
        endDate: new Date(),
        reason: ''
    };
    @observable globalBlockingFormErrors = {
        endDate: undefined,
        reason: undefined
    };
    @observable pending = false;
    @observable submissionError = undefined;
    @observable persistedGlobalBlocking = undefined;
    @observable blockedUser = undefined;
    @observable fetchingUser = false;

    constructor() {
        reaction(
            () => this.globalBlockingFormValues.endDate,
            endDate => {
                this.globalBlockingFormErrors.endDate = validateEndDate(endDate);
            }
        );

        reaction(
            () => this.globalBlockingFormValues.reason,
            reason => {
                this.globalBlockingFormErrors.reason = validateReason(reason);
            }
        )
    }

    @action setGlobalBlockingFormValue = (value, propertyName) => {
        this.globalBlockingFormValues[propertyName] = value;
    };

    @action setBlockedUser = user => {
        this.blockedUser = user;
    };

    @action setFetchingUser = fetchingUser => {
        this.fetchingUser = fetchingUser;
    };

    @action setCreateGlobalBlockingDialogOpened = opened => {
        this.globalBlockingDialogOpened = opened;
    };

    @action blockUser = () => {
        if (this.isFormValid()) {
            this.pending = true;
            return globalBlockingService.save({
                ...this.globalBlockingFormValues,
                blockedUserId: this.blockedUser.id
            }).then(response => {
                this.persistedGlobalBlocking = response.data;
                this.submissionError = undefined;
            }).catch(error => {
                this.submissionError = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
        }
    };

    @action isFormValid = () => {
        this.globalBlockingFormErrors = {
            reason: validateReason(this.globalBlockingFormValues.reason),
            endDate: validateEndDate(this.globalBlockingFormValues.endDate)
        };
        const {reason, endDate} = this.globalBlockingFormErrors;

        return !(reason && endDate);
    }
}

export default GlobalBlockingStore;
import {action, observable} from 'mobx';
import {createErrorFromResponse, globalBlockingService} from "../../../Api";

export default class GlobalBlockingStore {
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

    isFormValid = () => {
        return true;
    }
}
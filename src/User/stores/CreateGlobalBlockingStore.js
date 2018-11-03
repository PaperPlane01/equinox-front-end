import {observable, action} from 'mobx';
import Api, {Routes, createErrorFromResponse} from "../../Api";

export default class GlobalBlockingStore {
    @observable globalBlockingDialogOpen = false;
    @observable globalBlockingFormValues = {
        endDate: undefined,
        reason: ''
    };
    @observable globalBlockingFormErrors = {
        endDate: undefined,
        reason: undefined
    };
    @observable pending = false;
    @observable submissionError = undefined;
    @observable persistedGlobalBlocking = undefined;

    @action setGlobalBlockingFormValue = (value, propertyName) => {
        this.globalBlockingFormValues[propertyName] = value;
    };

    @action setCreateGlobalBlockingDialogOpen = open => {
        this.globalBlockingDialogOpen = open;
    };

    @action blockUser = userId => {
        if (this.isFormValid()) {
            this.pending = true;
            return Api.post(`/${Routes.GLOBAL_BLOCKINGS}`, JSON.stringify({
                ...this.globalBlockingFormValues,
                userId
            })).then(response => {
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
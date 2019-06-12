import {action, observable, reaction} from 'mobx';
import moment from 'moment';
import {validateEndDate, validateReason} from "../validation";
import {createErrorFromResponse, globalBlockingService} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    order: Component.Order.LOW
})
class UpdateGlobalBlockingStore {
    @observable globalBlockingId = undefined;
    @observable updateGlobalBlockingDialogOpen = false;
    @observable globalBlocking = undefined;
    @observable updateGlobalBlockingFormValues = {
        reason: "",
        endDate: undefined
    };
    @observable updateGlobalBlockingFormErrors = {
        reason: undefined,
        endDate: undefined
    };
    @observable fetchingGlobalBlocking = false;
    @observable fetchingGlobalBlockingError = undefined;
    @observable submitting = false;
    @observable submissionError = undefined;
    @observable persistedGlobalBlocking = undefined;

    constructor() {
        reaction(
            () => this.globalBlockingId,
            () => {
                this.fetchGlobalBlocking();
            }
        );

        reaction(
            () => this.globalBlocking,
            globalBlocking => {
                this.updateGlobalBlockingFormValues = {
                    endDate: moment(globalBlocking.endDate).toDate(),
                    reason: globalBlocking.reason
                }
            }
        );

        reaction(
            () => this.updateGlobalBlockingFormValues.reason,
            reason => {
                this.updateGlobalBlockingFormErrors.reason = validateReason(reason);
            }
        );

        reaction(
            () => this.updateGlobalBlockingFormValues.endDate,
            endDate => {
                this.updateGlobalBlockingFormErrors.endDate = validateEndDate(endDate);
            }
        );

        reaction(
            () => this.updateGlobalBlockingDialogOpen,
            open => {
                if (!open) {
                    this.persistedGlobalBlocking = undefined;
                }
            }
        )
    }

    @action setGlobalBlockingId = id => {
        this.globalBlockingId = id;
    };

    @action setUpdateGlobalBlockingDialogOpen = open => {
        this.updateGlobalBlockingDialogOpen = open;
    };

    @action setUpdateGlobalBlockingFormValue = (value, propertyName) => {
        this.updateGlobalBlockingFormValues[propertyName] = value;
    };

    @action fetchGlobalBlocking = () => {
        this.fetchingGlobalBlocking = true;
        this.fetchingGlobalBlockingError = undefined;

        return globalBlockingService.findById(this.globalBlockingId)
            .then(response => {
                this.globalBlocking = response.data;
            }).catch(error => {
                this.fetchingGlobalBlockingError = createErrorFromResponse(error.response);
            }).then(() => {
                this.fetchingGlobalBlocking = false;
            })
    };

    @action updateGlobalBlocking = () => {
        if (this.isFormValid()) {
            this.submissionError = undefined;
            this.submitting = true;

            return globalBlockingService.update(this.globalBlockingId, this.updateGlobalBlockingFormValues)
                .then(response => {
                    this.persistedGlobalBlocking = response.data;
                }).catch(error => {
                    this.submissionError = createErrorFromResponse(error.response);
                }).then(() => {
                    this.submitting = false;
                })
        }
    };

    @action isFormValid = () => {
        this.updateGlobalBlockingFormErrors.reason = validateReason(this.updateGlobalBlockingFormValues.reason);
        this.updateGlobalBlockingFormErrors.endDate = validateEndDate(this.updateGlobalBlockingFormValues.endDate);

        const {reason, endDate} = this.updateGlobalBlockingFormErrors;

        return !Boolean(reason && endDate);
    }
}

export default UpdateGlobalBlockingStore;
import {observable, action, reaction} from 'mobx';
import {createErrorFromResponse, globalBlockingService} from "../../Api";

export default class DeleteGlobalBlockingStore {
    @observable globalBlockingId = undefined;
    @observable deleteGlobalBlockingDialogOpen = false;
    @observable deleteSuccess = false;
    @observable pending = false;
    @observable error = undefined;

    constructor() {
        reaction(
            () => this.deleteGlobalBlockingDialogOpen,
            open => {
                if (!open) {
                    this.deleteSuccess = false;
                    this.globalBlockingId = undefined;
                }
            }
        )
    }

    @action setGlobalBlockingId = id => {
        this.globalBlockingId = id;
    };

    @action setDeleteGlobalBlockingDialogOpen = open => {
        this.deleteGlobalBlockingDialogOpen = open;
    };

    @action deleteGlobalBlocking = () => {
        this.error = undefined;
        this.pending = true;

        return globalBlockingService.delete(this.globalBlockingId)
            .then(() => {
                this.deleteSuccess = true;
                this.deleteGlobalBlockingDialogOpen = false;
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    }
}
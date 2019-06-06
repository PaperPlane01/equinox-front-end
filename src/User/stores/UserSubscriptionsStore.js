import {observable, action, reaction, computed} from "mobx";
import {subscriptionService, createErrorFromResponse} from "../../Api"

export default class UserSubscriptionsStore {
    @observable subscriptions = [];
    @observable paginationParameters = {
        pageSize: 50,
        sortingDirection: 'desc',
        sortBy: 'id'
    };
    @observable currentPageNumber = 0;
    @observable error = undefined;
    @observable fetchingSubscriptions = false;
    @observable subscriptionsDialogOpen = false;
    @observable userProfileStore = undefined;

    @computed
    get userId() {
        return this.userProfileStore.userId;
    }

    constructor(userProfileStore) {
        this.userProfileStore = userProfileStore;

        reaction(
            () => this.userId,
            () => {
                this.reset();
                this.fetchSubscriptions();
            }
        )
    }

    @action
    fetchSubscriptions = () => {
        this.fetchingSubscriptions = true;

        return subscriptionService.findSubscriptionsOfUser(this.userId, {
            ...this.paginationParameters,
            page: this.currentPageNumber
        }).then(({data}) => {
            if (data.length !== 0) {
                this.subscriptions = [
                    ...this.subscriptions,
                    ...data
                ];
                this.currentPageNumber = this.currentPageNumber + 1;
            }
        }).catch(({response}) => {
            this.error = createErrorFromResponse(response);
        }).then(() => {
            this.fetchingSubscriptions = false;
        })
    };

    @action
    resetPaginationParameters = () => {
        this.paginationParameters = {
            pageSize: 50,
            sortingDirection: 'desc',
            sortBy: 'id'
        };
    };

    @action
    reset = () => {
        this.resetPaginationParameters();
        this.subscriptions = [];
        this.currentPageNumber = 0;
        this.error = undefined;
        this.fetchingSubscriptions = false;
        this.subscriptionsDialogOpen = false;
    };

    @action
    setSubscriptionsDialogOpen = open => {
        this.subscriptionsDialogOpen = open;
    }
}
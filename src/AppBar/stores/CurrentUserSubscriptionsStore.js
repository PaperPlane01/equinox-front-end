import {action, computed, observable, reaction} from 'mobx';
import {createErrorFromResponse, subscriptionService} from "../../Api";

export default class CurrentUserSubscriptionsStore {
    @observable appBarStore = undefined;
    @observable authStore = undefined;
    @observable subscriptions = [];
    @observable initiallyLoaded = false;
    @observable pending = false;
    @observable currentPage = 0;
    @observable error = undefined;
    @observable subscriptionsInitiallyFetched = false;

    @computed get currentUser() {
        return this.authStore.currentUser;
    }

    @computed get subscriptionsExpanded() {
        return this.appBarStore.subscriptionsOpened;
    }

    constructor(authStore, appBarStore) {
        this.authStore= authStore;
        this.appBarStore = appBarStore;

        reaction(
            () => this.subscriptionsExpanded,
            () => {
                if (!this.subscriptionsInitiallyFetched) {
                    this.currentPage = 0;
                    this.fetchCurrentUserSubscriptions();
                }
            }
        );

        reaction(
            () => this.currentUser,
            () => {
                this.subscriptions = [];
                this.currentPage = 0;
                this.initiallyLoaded = false;
            }
        )
    }

    @action fetchCurrentUserSubscriptions = () => {
        this.error = undefined;
        this.pending = true;

        return subscriptionService.findSubscriptionsOfCurrentUser({
            page: this.currentPage,
            pageSize: 50
        }).then(response => {
            if (!this.subscriptionsInitiallyFetched) {
                this.subscriptionsInitiallyFetched = true;
            }
            if (response.data.length !== 0) {
                this.currentPage = this.currentPage + 1;
                this.subscriptions = [
                    ...this.subscriptions,
                    ...response.data
                ];
                if (!this.initiallyLoaded) {
                    this.initiallyLoaded = true;
                }
            }
        }).catch(error => {
            this.error = createErrorFromResponse(error.response);
        }).then(() => {
            this.pending = false;
        })
    };

    @action removeSubscription = id => {
        this.subscriptions = this.subscriptions.filter(subscription => subscription.id !== id);
    };

    @action addSubscription = subscription => {
        this.subscriptions.push(subscription);
    }
}
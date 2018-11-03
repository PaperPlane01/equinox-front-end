import {action, observable, reaction} from 'mobx';

export default class AppBarStore {
    @observable drawerOpened = false;
    @observable subscriptionsOpened = false;
    @observable authStore = undefined;

    constructor(authStore) {
        this.authStore = authStore;

        reaction(
            () => authStore.loggedIn,
            () => {
                if (!authStore.loggedIn) {
                    this.subscriptionsOpened = false;
                }
            }
        )
    }

    @action setDrawerOpened = opened => {
        this.drawerOpened = opened;
    };

    @action setSubscriptionsOpen = opened => {
        this.subscriptionsOpened = opened;
    }
}
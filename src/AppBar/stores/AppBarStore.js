import {action, observable, reaction} from 'mobx';

export default class AppBarStore {
    @observable drawerOpened = false;
    @observable subscriptionsOpened = false;
    @observable blogsOpened = false;
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

    @action setBlogsOpened = opened => {
        this.blogsOpened = opened;
    };

    @action setSubscriptionsOpened = opened => {
        this.subscriptionsOpened = opened;
    }
}
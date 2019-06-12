import {action, observable, reaction} from 'mobx';
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'authStore'}
    ],
    order: 1
})
class AppBarStore {
    @observable drawerOpened = false;
    @observable subscriptionsOpened = false;
    @observable reportsOpened = false;
    @observable blogsOpened = false;
    @observable authStore = undefined;

    constructor() {

        reaction(
            () => this.authStore.loggedIn,
            () => {
                if (!this.authStore.loggedIn) {
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
    };

    @action setReportsOpened = opened => {
        this.reportsOpened = opened;
    }
}

export default AppBarStore;
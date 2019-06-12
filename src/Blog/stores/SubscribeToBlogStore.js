import {action, computed, observable, reaction} from 'mobx';
import {createErrorFromResponse, subscriptionService} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'blogStore'},
        {propertyName: 'currentUserSubscriptionsStore'}
    ]
})
class SubscribeToBlogStore {
    @observable persistedSubscription = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable blogStore = undefined;
    @observable currentUserSubscriptionsStore = undefined;

    @computed get blogId() {
        return this.blogStore.blog ? this.blogStore.blog.id : undefined;
    }

    constructor() {
        reaction(
            () => this.persistedSubscription,
            () => {
                if (this.persistedSubscription) {
                    this.blogStore.setCurrentUserSubscribed(true);
                    this.blogStore.setSubscriptionId(this.persistedSubscription.id);
                }
            }
        )
    }

    @action subscribeToBlog = () => {
        this.pending = true;

        return subscriptionService.save({blogId: this.blogId})
            .then(response => {
                this.persistedSubscription = response.data;
                this.currentUserSubscriptionsStore.addSubscription(this.persistedSubscription);
                this.error = undefined;
            }).catch(error => {
                this.persistedSubscription = undefined;
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    }
}

export default SubscribeToBlogStore;
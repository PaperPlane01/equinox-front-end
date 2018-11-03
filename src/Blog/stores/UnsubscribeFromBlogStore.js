import {action, computed, observable} from 'mobx';
import {createErrorFromResponse, subscriptionService} from '../../Api';

export default class UnsubscribeFromBlogStore {
    @observable blogStore = undefined;
    @observable currentUserSubscriptionsStore = undefined;
    @observable pending = false;
    @observable error = undefined;

    @computed get subscriptionId() {
        return this.blogStore.blog ? this.blogStore.blog.subscriptionId : undefined;
    }

    constructor(blogStore, currentUserSubscriptionsStore) {
        this.blogStore = blogStore;
        this.currentUserSubscriptionsStore = currentUserSubscriptionsStore;
    }

    @action unsubscribeFromBlog = () => {
        if (this.subscriptionId) {
            this.pending = true;

            return subscriptionService.delete(this.subscriptionId)
                .then(() => {
                    this.blogStore.setCurrentUserSubscribed(false);
                    this.currentUserSubscriptionsStore.removeSubscription(this.subscriptionId);
                    this.blogStore.setSubscriptionId(undefined);
                }).catch(error => {
                    this.error = createErrorFromResponse(error.response);
                }).then(() => {
                    this.pending = false;
                })
        }
    }
}
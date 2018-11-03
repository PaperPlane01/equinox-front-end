import {action, computed, observable, reaction} from 'mobx';
import {blogService, createErrorFromResponse, subscriptionService} from '../../Api';

export default class BlogStore {
    @observable blog = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable blogId = undefined;
    @observable authStore = undefined;

    @computed get loggedIn() {
        return this.authStore.loggedIn;
    }

    @computed get currentUser() {
        return this.authStore.currentUser;
    }

    constructor(authStore) {
        this.authStore = authStore;

        reaction(
            () => this.blogId,
            () => {
                if (this.blogId) {
                    this.blog = undefined;
                    this.fetchBlog();
                }
            }
        );

        reaction(
            () => this.loggedIn,
            () => {
                if (!this.loggedIn && this.blog) {
                    this.setCurrentUserSubscribed(false);
                }
            }
        );

        reaction(
            () => this.currentUser,
            () => {
                if (this.currentUser && this.blog) {
                    this.checkIfUserSubscribedToBlog();
                }
            }
        )
    }

    @action fetchBlog = () => {
        this.pending = true;

        return blogService.findById(this.blogId)
            .then(response => {
                this.blog = response.data;
                this.error = undefined;
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    };

    @action setBlogId = blogId => {
        this.blogId = blogId;
    };

    @action reset = () => {
        this.blog = undefined;
        this.blogId = undefined;
    };

    @action setCurrentUserSubscribed = subscribed => {
        this.blog.currentUserSubscribed = subscribed;
    };

    @action setSubscriptionId = id => {
        this.blog.subscriptionId = id;
    };

    @action checkIfUserSubscribedToBlog = () => {
        return subscriptionService.isUserSubscribedToBlog(this.currentUser.id, this.blogId).then(() => {
            this.blog.currentUserSubscribed = true;
        }).catch(error => {
            if (error.response.status === 404) {
                this.blog.currentUserSubscribed = false;
            }
        })
    }
}
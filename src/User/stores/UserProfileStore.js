import {action, observable, reaction} from 'mobx';
import {Component} from "../../simple-ioc";
import Api, {createErrorFromResponse, Routes} from "../../Api";

@Component({
    dependencies: [
        {propertyName: 'authStore'}
    ],
    order: Component.Order.LOW
})
class UserProfileStore {
    @observable userId = undefined;
    @observable user = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable authStore = undefined;

    constructor() {
        reaction(
            () => this.userId,
            () => this.fetchUser()
        )
    }

    @action setUserId = id => {
        this.userId = id;
    };

    @action fetchUser = () => {
        if (this.authStore.currentUser && this.userId === this.authStore.currentUser.id) {
            return this.fetchCurrentUserProfile();
        } else {
            return this.fetchUserProfile();
        }
    };

    @action fetchCurrentUserProfile = () => {
        this.pending = true;

        return Api.get(`/${Routes.CURRENT_USER}/${Routes.FULL_PROFILE}`)
            .then(response => {
                this.user = response.data;
                this.error = undefined;
            }).catch(error => {
                console.log(error);
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    };

    @action fetchUserProfile = () => {
        this.pending = true;

        return Api.get(`/${Routes.USERS}/${this.userId}`)
            .then(response => {
                this.user = response.data;
                this.error = undefined;
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    }
}

export default UserProfileStore;
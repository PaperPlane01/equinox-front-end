import {action, reaction, computed, observable} from "mobx";
import {blogService, createErrorFromResponse} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'userProfileStore'},
    ],
    order: Component.Order.MEDIUM
})
class UserManagedBlogsStore {
    @observable managedBlogsHolder = {
        ownedBlogs: [],
        managedBlogs: []
    };
    @observable pending = false;
    @observable error = undefined;
    @observable userManagedBlogsDialogOpen = false;
    @observable userProfileStore = undefined;

    @computed
    get userId() {
        return this.userProfileStore.userId;
    }

    constructor() {
        reaction(
            () => this.userId,
            userId => {
                if (userId) {
                    this.fetchManagedBlogs();
                }
            }
        )
    }

    @action
    fetchManagedBlogs = () => {
        this.pending = true;
        this.error = undefined;

        return blogService.findManagedByUser(this.userId)
            .then(({data}) => {
                this.managedBlogsHolder = {
                    ownedBlogs: data.ownedBlogs,
                    managedBlogs: data.managedBlogs
                }
            }).catch(({response}) => {
                this.error = createErrorFromResponse(response);
            }).then(() => this.pending = false);
    }
}

export default UserManagedBlogsStore;
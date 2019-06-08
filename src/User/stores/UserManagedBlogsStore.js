import {action, reaction, computed, observable} from "mobx";
import {blogService, createErrorFromResponse} from "../../Api";

export default class UserManagedBlogsStore {
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

    constructor(userProfileStore) {
        this.userProfileStore = userProfileStore;

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
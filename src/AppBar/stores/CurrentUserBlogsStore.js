import {observable, action, reaction, computed} from 'mobx';
import {blogService, createErrorFromResponse} from "../../Api/index";

export default class CurrentUserBlogsStore {
    @observable authStore = undefined;
    @observable createBlogStore = undefined;
    @observable blogs = [];
    @observable pending = false;
    @observable initiallyLoaded = false;
    @observable error = undefined;
    @observable appBarStore = undefined;

    @computed get currentUser() {
        return this.authStore.currentUser;
    }

    @computed get blogsExpanded() {
        return this.appBarStore.blogsOpened;
    }

    constructor(authStore, createBlogStore, appBarStore) {
        this.authStore = authStore;
        this.createBlogStore = createBlogStore;
        this.appBarStore = appBarStore;

        reaction(
            () => this.currentUser,
            user => {
                if (!user) {
                    this.blogs = [];
                    this.initiallyLoaded = false;
                }
            }
        );

        reaction(
            () => this.createBlogStore.persistedBlog,
            blog => {
                this.blogs.push(blog);
            }
        );

        reaction(
            () => this.blogsExpanded,
            expanded => {
                if (expanded) {
                    this.fetchBlogsOwnedByCurrentUser();
                }
            }

        )
    }

    @action fetchBlogsOwnedByCurrentUser = () => {
        this.error = undefined;
        this.pending = true;

        return blogService.findOwnedByCurrentUser()
            .then(response => {
                this.blogs = response.data;
                this.initiallyLoaded = true;
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    }
}
import {action, reaction, observable, computed} from 'mobx';
import {blogManagerService, createErrorFromResponse} from "../../Api";
import {canSeeBlogManagers} from "../permissions";

export default class BlogManagersBlockStore {
    @observable blogManagers = [];
    @observable pending = false;
    @observable error = undefined;
    @observable authStore = undefined;
    @observable blogStore = undefined;

    @computed get blogId() {
        return this.blogStore.blogId;
    }

    @computed get blog() {
        return this.blogStore.blog;
    }

    @computed get currentUser() {
        return this.authStore.currentUser;
    }

    @computed get blogOwner() {
        return this.blogStore.blog && this.blogStore.blog.owner;
    }

    constructor(authStore, blogStore) {
        this.authStore = authStore;
        this.blogStore = blogStore;

        reaction(
            () => this.currentUser,
            () => {
                if (canSeeBlogManagers(this.currentUser, this.blog)) {
                    this.fetchBlogManagers();
                } else {
                    this.blogManagers = [];
                }
            }
        );

        reaction(
            () => this.blog,
            () => {
                if (canSeeBlogManagers(this.currentUser, this.blog)) {
                    this.fetchBlogManagers();
                } else {
                    this.blogManagers = [];
                }
            }
        )
    }

    @action fetchBlogManagers = () => {
        this.pending = true;
        this.error = undefined;

        return blogManagerService.findByBlog(this.blogId, {
            page: 0,
            pageSize: 10
        }).then(response => {
            this.blogManagers = response.data;
        }).catch(error => {
            this.error = createErrorFromResponse(error.response);
        }).then(() => {
            this.pending = false;
        })
    }
}
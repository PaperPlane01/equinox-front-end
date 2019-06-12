import {action, computed, observable, reaction} from 'mobx';
import {canSeeUsersBlockedInBlog} from "../permissions";
import {blogBlockingService, blogService, createErrorFromResponse} from "../../Api";
import {isBlank} from "../../utils";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'authStore'}
    ]
})
class BlogBlockingsStore {
    @observable blogId = undefined;
    @observable blogBlockings = [];
    @observable currentPage = 0;
    @observable blockedUserUsername = "";
    @observable blockingsError = undefined;
    @observable blogError = undefined;
    @observable fetchingBlogBlockings = false;
    @observable fetchingBlog = false;
    @observable blog = undefined;
    @observable authStore = undefined;

    @computed get currentUser() {
        return this.authStore.currentUser;
    }

    constructor() {
        reaction(
            () => this.blogId,
            () => {
                if (this.blogId) {
                    this.blockedUserUsername = "";
                    this.blogBlockings = [];
                    this.currentPage = 0;
                    this.fetchBlog();
                    this.fetchBlogBlockings();
                }
            }
        );

        reaction(
            () => this.blockedUserUsername,
            () => {
                if (this.blogId) {
                    this.blogBlockings = [];
                    this.currentPage = 0;
                    this.fetchBlogBlockings();
                }
            }
        );

        reaction(
            () => this.currentUser,
            () => {
                if (this.blogId) {
                    this.blogBlockings = [];
                    this.currentPage = 0;
                    this.fetchBlogBlockings();
                }
            }
        )
    }

    @action setBlogId = id => {
        this.blogId = id;
    };

    @action setBlockedUserUsername = username => {
        this.blockedUserUsername = username;
    };

    @action fetchBlog = () => {
        this.fetchingBlog = true;
        this.blogError = undefined;

        return blogService.findMinifiedById(this.blogId)
            .then(response => {
                this.blog = response.data;
            }).catch(error => {
                this.blogError = createErrorFromResponse(error.response);
            }).then(() => {
                this.fetchingBlog = false;
            })
    };

    @action fetchBlogBlockings = () => {
        if (!canSeeUsersBlockedInBlog(this.currentUser, this.blogId)) {
            return;
        }

        this.pending = true;
        this.blockingsError = undefined;

        if (isBlank(this.blockedUserUsername)) {
            return blogBlockingService.findNotEndedByBlog(this.blogId, {
                page: this.currentPage,
                pageSize: 30
            }).then(response => {
                if (response.data.length !== 0) {
                    this.blogBlockings = [
                        ...this.blogBlockings,
                        ...response.data
                    ];
                    this.currentPage = this.currentPage + 1;
                }
            }).catch(error => {
                this.blockingsError = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
        } else {
            return blogBlockingService.findNotEndedByBlogAndBlockedUserUsername(this.blogId, this.blockedUserUsername, {
                page: this.currentPage,
                pageSize: 30
            }).then(response => {
                if (response.data.length !== 0) {
                    this.blogBlockings = [
                        ...this.blogBlockings,
                        ...response.data
                    ];
                    this.currentPage = this.currentPage + 1;
                }
            }).catch(error => {
                this.blockingsError = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
        }
    };

    @action deleteBlogBlocking = id => {
        return blogBlockingService.delete(id)
            .then(() => {
                this.blogBlockings = this.blogBlockings.filter(blogBlocking => blogBlocking.id !== id);
            });
    };

    @action reset = () => {
        this.blogId = undefined;
        this.blogBlockings = [];
        this.error = undefined;
        this.currentPage = 0;
        this.blockedUserUsername = "";
    }
}

export default BlogBlockingsStore;
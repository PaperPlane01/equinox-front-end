import {observable, action, reaction} from 'mobx';
import {blogBlockingService, blogService, createErrorFromResponse} from "../../../Api";
import {isBlank} from "../../../utils";

export default class BlogBlockingsStore {
    @observable blogId = undefined;
    @observable blogBlockings = [];
    @observable currentPage = 0;
    @observable blockedUserUsername = "";
    @observable blockingsError = undefined;
    @observable blogError = undefined;
    @observable fetchingBlogBlockings = false;
    @observable fetchingBlog = false;
    @observable blog = undefined;

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
                this.blogBlockings.filter(blogBlocking => blogBlocking.id !== id);
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
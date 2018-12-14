import {observable, action, reaction} from 'mobx';
import _ from 'lodash';
import {blogManagerService, createErrorFromResponse} from "../../Api/index";
import {isBlank} from "../../utils/index";

export default class BlogManagersStore {
    @observable blogId = undefined;
    @observable managers = [];
    @observable currentPage = 0;
    @observable paginationParameters = {
        pageSize: 30,
        sortingDirection: 'asc',
        sortBy: 'id'
    };
    @observable username = '';
    @observable updateBlogManagerStore = undefined;
    @observable pending = false;
    @observable error = undefined;

    constructor(updateBlogManagerStore) {
        this.updateBlogManagerStore = updateBlogManagerStore;

        reaction(
            () => this.blogId,
            () => {
                if (this.blogId) {
                    this.currentPage = 0;
                    this.managers = [];
                    this.fetchBlogManagers();
                }
            }
        );

        reaction(
            () => this.username,
            () => {
                this.currentPage = 0;
                this.managers = [];
                const fetchBlogManagers = _.debounce(this.fetchBlogManagers, 300);
                fetchBlogManagers();
            }
        );

        reaction(
            () => this.updateBlogManagerStore.updatedBlogManager,
            () => {
                this.managers = _.unionBy(this.managers, [this.updateBlogManagerStore.updatedBlogManager], 'id');
            }
        )
    }

    @action setBlogId = id => {
        this.blogId = id;
    };

    @action setUsername = username => {
        this.username = username;
    };

    @action deleteBlogManager = id => {
        return blogManagerService.delete(this.blogId, id)
            .then(() => {
                this.managers = this.managers.filter(manager => manager.id !== id);
            })
    };

    @action fetchBlogManagers = () => {
        this.pending = false;
        this.error = undefined;

        if (isBlank(this.username)) {
            return blogManagerService.findByBlog(this.blogId, {
                ...this.paginationParameters,
                page: this.currentPage
            }).then(response => {
                if (response.data.length !== 0) {
                    this.managers = [
                        ...this.managers,
                        ...response.data
                    ];
                    this.currentPage = this.currentPage + 1;
                }
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
        } else {
            return blogManagerService.findByBlogAndUsername(this.blogId, this.username, {
                ...this.paginationParameters,
                page: this.currentPage
            }).then(response => {
                if (response.data.length !== 0) {
                    this.managers = [
                        ...this.managers,
                        ...response.data
                    ];
                    this.currentPage = this.currentPage + 1;
                }
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
        }
    }
}
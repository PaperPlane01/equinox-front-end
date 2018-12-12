import {observable, action, reaction} from 'mobx';
import _ from 'lodash';
import {createErrorFromResponse, subscriptionService, blogService} from "../../Api";

export default class BlogSubscribersListStore {
    @observable subscriptions = [];
    @observable fetchingBlog = false;
    @observable fetchingSubscriptions = false;
    @observable error = undefined;
    @observable paginationParameters = {
        pageSize: 30,
        sortingDirection: 'DESC',
        sortBy: 'id'
    };
    @observable currentPageNumber = 0;
    @observable blogId = undefined;
    @observable blog = undefined;
    @observable username = undefined;

    constructor() {
        reaction(
            () => this.blogId,
            () => {
                this.currentPageNumber = 0;
                this.fetchSubscriptions();
                this.fetchBlog();
            }
        );

        reaction(
            () => this.username,
            () => {
                this.subscriptions = [];
                this.currentPageNumber = 0;
                const fetchSubscriptions = _.debounce(this.fetchSubscriptions, 300);
                fetchSubscriptions();
            }
        )
    }

    @action setBlogId = id => {
        this.blogId = id;
    };

    @action setUsername = username => {
        this.username = username;
    };

    @action fetchSubscriptions = () => {
        if (this.blogId) {
            if (this.username) {
                this.fetchingSubscriptions = true;
                this.error = undefined;

                return subscriptionService.findByBlogAndUsername(this.blogId, this.username, {
                    ...this.paginationParameters,
                    page: this.currentPageNumber
                }).then(response => {
                    this.subscriptions.push(...response.data);
                    if (response.data.length !== 0) {
                        this.currentPageNumber = this.currentPageNumber + 1;
                    }
                }).catch(error => {
                    this.error = createErrorFromResponse(error.response);
                }).then(() => {
                    this.fetchingSubscriptions = false;
                })
            } else {
                this.fetchingSubscriptions = true;
                this.error = undefined;

                return subscriptionService.findByBlog(this.blogId, {
                    ...this.paginationParameters,
                    page: this.currentPageNumber
                }).then(response => {
                    this.subscriptions.push(...response.data);
                    if (response.data.length !== 0) {
                        this.currentPageNumber = this.currentPageNumber + 1;
                    }
                }).catch(error => {
                    this.error = createErrorFromResponse(error.response);
                }).then(() => {
                    this.fetchingSubscriptions = false;
                })
            }
        }
    };

    @action fetchBlog = () => {
        if (this.blogId) {
            this.fetchingBlog = true;
            this.error = undefined;

            return blogService.findById(this.blogId)
                .then(response => {
                    this.blog = response.data;
                }).catch(error => {
                    this.error = createErrorFromResponse(error.response);
                }).then(() => {
                    this.fetchingBlog = false;
                });
        }
    };

    @action reset = () => {
        this.blogId = undefined;
        this.blog = undefined;
        this.currentPageNumber = 0;
        this.error = undefined;
        this.subscriptions = [];
        this.pending = false;
    }
}
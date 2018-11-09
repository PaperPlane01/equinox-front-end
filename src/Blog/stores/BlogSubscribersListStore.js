import {observable, action, reaction} from 'mobx';
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

    constructor() {
        reaction(
            () => this.blogId,
            () => {
                this.fetchSubscriptions();
                this.fetchBlog();
            }
        )
    }


    @action setBlogId = id => {
        this.blogId = id;
    };

    @action fetchSubscriptions = () => {
        if (this.blogId) {
            this.fetchingSubscriptions = true;
            this.error = undefined;

            return subscriptionService.findByBlog(this.blogId, {
                ...this.paginationParameters,
                page: this.currentPageNumber
            }).then(response => {
                if (response.data.length !== 0) {
                    this.subscriptions.push(...response.data);
                    this.currentPageNumber = this.currentPageNumber + 1;
                }
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.fetchingSubscriptions = false;
            })
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
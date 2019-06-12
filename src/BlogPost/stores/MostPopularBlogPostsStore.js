import {observable, action, reaction, computed, toJS} from 'mobx';
import localStorage from 'mobx-localstorage';
import {normalize} from 'normalizr'
import {blogPostListSchema} from "./schemas";
import MostPopularBlogPostsPeriod from '../MostPopularBlogPostsPeriod';
import {blogPostService, createErrorFromResponse} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'authStore'},
        {propertyName: 'blogPostLikeStore'},
        {propertyName: 'deleteBlogPostDialogStore'}
    ]
})
class MostPopularBlogPostsStore {
    @observable blogPosts = {
        result: [],
        entities: {
            blogPosts: {}
        }
    };
    @observable paginationParameters = {
        pageSize: 15
    };
    @observable currentPage = 0;
    @observable authStore = undefined;
    @observable blogPostLikeStore = undefined;
    @observable deleteBlogPostDialogStore = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable period = localStorage.getItem('mostPopularBlogPostsPeriod') || MostPopularBlogPostsPeriod.WEEK;

    @computed get currentUser() {
        return this.authStore.currentUser;
    }

    constructor() {
        reaction(
            () => this.currentUser,
            () => {
                if (!this.currentUser || (this.authStore.previousUser && this.currentUser !== this.authStore.previousUser)) {
                    this.reset();
                    this.fetchMostPopularBlogPosts();
                }
            }
        );

        reaction(
            () => this.period,
            () => {
                this.reset();
                this.fetchMostPopularBlogPosts();
            }
        );

        reaction(
            () => this.deleteBlogPostDialogStore.deletedBlogPostId,
            blogPostId => {
                if (blogPostId) {
                    this.blogPosts.result = this.blogPosts.result.filter(id => id !== blogPostId);
                }
            }
        );

        reaction(
            () => this.blogPostLikeStore.affectedBlogPostId,
            blogPostId => {
                if (blogPostId) {
                    this.blogPosts.entities.blogPosts[blogPostId].likedByCurrentUser =
                        Boolean(!this.blogPosts.entities.blogPosts[blogPostId].likedByCurrentUser);
                    this.blogPosts.entities.blogPosts[blogPostId].numberOfLikes =
                        this.blogPostLikeStore.updatedNumberOfLikes;
                    this.blogPosts.entities.blogPosts[blogPostId].likeId =
                        this.blogPostLikeStore.persistedBlogPostLikeId;
                }
            }
        )
    }

    @action reset = () => {
        this.blogPosts = {
            result: [],
            entities: {
                blogPosts: {}
            }
        };
        this.currentPage = 0;
        this.error = undefined;
    };

    @action setPeriod = period => {
        this.period = period;
        localStorage.setItem('mostPopularBlogPostsPeriod', period);
    };

    @action fetchMostPopularBlogPosts = () => {
        this.pending = true;
        this.error = undefined;
        const fetchingFunction = this.getFetchingFunction();

        return fetchingFunction({
            ...this.paginationParameters,
            page: this.currentPage
        }).then(response => {
            if (response.data.length !== 0) {
                const normalizedResponse = normalize(response.data, blogPostListSchema);
                this.blogPosts = {
                    ...this.blogPosts,
                    result: [
                        ...this.blogPosts.result,
                        ...normalizedResponse.result
                    ],
                    entities: {
                        blogPosts: {
                            ...this.blogPosts.entities.blogPosts,
                            ...normalizedResponse.entities.blogPosts
                        }
                    }
                };
                console.log(toJS(this.blogPosts));
                this.currentPage = this.currentPage + 1;
            }
        }).catch(error => {
            this.error = createErrorFromResponse(error.response);
        }).then(() => {
            this.pending = undefined;
        })
    };

    getFetchingFunction = () => {
        switch (this.period) {
            case MostPopularBlogPostsPeriod.WEEK:
                return blogPostService.getMostPopularForWeek;
            case MostPopularBlogPostsPeriod.MONTH:
                return blogPostService.getMostPopularForMonth;
            case MostPopularBlogPostsPeriod.YEAR:
                return blogPostService.getMostPopularForYear;
            default:
                return blogPostService.getMostPopularForWeek;
        }
    }
}

export default MostPopularBlogPostsStore;
import {observable, action, computed, reaction, toJS} from 'mobx';
import {normalize, denormalize} from 'normalizr';
import {blogPostListSchema} from "./schemas";
import {mergeNormalizedBlogPosts} from "./mergeNormalizedBlogPosts";
import {createErrorFromResponse, blogPostService} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'blogPostLikeStore'},
        {propertyName: 'deleteBlogPostStore', componentName: 'deleteBlogPostDialogStore'}
    ]
})
class SearchBlogPostsStore {
    @observable searchForm = {
        query: '',
        tags: []
    };
    @observable normalizedBlogPosts = {
        result: [],
        entities: {
            blogPosts: {}
        }
    };
    @observable pending = false;
    @observable error = undefined;
    @observable currentPageNumber = 0;
    @observable blogPostLikeStore = undefined;
    @observable deleteBlogPostStore = undefined;

    @computed get blogPosts() {
        return denormalize(this.normalizedBlogPosts.result, blogPostListSchema, this.normalizedBlogPosts.entities);
    }

    constructor() {
        reaction(
            () => this.blogPostLikeStore.result,
            result => {
                const {blogPostId, likeId, updatedNumberOfLikes} = result;
                this.setBlogPostLikedByCurrentUser(blogPostId, Boolean(likeId), likeId, updatedNumberOfLikes);
            }
        );

        reaction(
            () => this.deleteBlogPostStore.deletedBlogPostId,
            id => {
                this.removeBlogPost(id);
            }
        )
    };

    @action
    updateSearchFormValue = (key, value) => {
        this.searchForm[key] = value;
    };

    @action
    addTag = tag => {
        this.searchForm.tags.push(tag);
    };

    @action
    removeTag = index => {
        this.searchForm.tags = this.searchForm.tags.filter((tag, tagIndex) => tagIndex !== index);
    };

    @action
    search = () => {
        this.searchByQueryAndTags(this.searchForm.query, this.searchForm.tags);
    };

    @action
    searchByQueryAndTags = (query, tags) => {
        if (query && tags && (query !== this.searchForm.query || tags !== this.searchForm.tags)) {
            this.reset();
        }
        const queryToSearch = query ? query : this.searchForm.query;
        if (query) {
            this.searchForm.query = query;
        }
        if (tags) {
            this.searchForm.tags = tags;
        }

        this.pending = true;
        this.error = undefined;
        return blogPostService.search(queryToSearch, tags, {page: this.currentPageNumber})
            .then(response => {
                if (response.data.length !== 0) {
                    const normalizedResponse = normalize(response.data, blogPostListSchema);
                    this.normalizedBlogPosts = mergeNormalizedBlogPosts(normalizedResponse, this.normalizedBlogPosts);
                    this.currentPageNumber = this.currentPageNumber + 1;
                }
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    };

    @action setBlogPostLikedByCurrentUser = (blogPostId, likedByCurrentUser, likeId, numberOfLikes) => {
        if (this.normalizedBlogPosts.entities.blogPosts[blogPostId]) {
            console.log(toJS(this.normalizedBlogPosts.entities.blogPosts[blogPostId]));
            this.normalizedBlogPosts.entities.blogPosts[blogPostId] = {
                ...this.normalizedBlogPosts.entities.blogPosts[blogPostId],
                likedByCurrentUser,
                likeId,
                numberOfLikes
            };
        }
    };

    @action removeBlogPost = id => {
        if (this.normalizedBlogPosts.entities.blogPosts[id]) {
            this.normalizedBlogPosts.result = this.normalizedBlogPosts.result.filter(blogPostId => blogPostId !== id);
            delete this.normalizedBlogPosts.entities.blogPosts[id];
        }
    };

    @action reset = () => {
        this.normalizedBlogPosts = {
            result: [],
            entities: {
                blogPosts: {}
            }
        };
        this.currentPageNumber = 0;
    }
}

export default SearchBlogPostsStore;
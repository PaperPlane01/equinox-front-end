import {observable, action, computed, reaction, toJS} from 'mobx';
import {normalize, denormalize} from 'normalizr';
import {blogPostListSchema} from "./schemas";
import {mergeNormalizedBlogPosts} from "./mergeNormalizedBlogPosts";
import {createErrorFromResponse, blogPostService} from "../../Api";

export default class SearchBlogPostsStore {
    @observable query = '';
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

    constructor(blogPostLikeStore, deleteBlogPostStore) {
        this.blogPostLikeStore = blogPostLikeStore;
        this.deleteBlogPostStore = deleteBlogPostStore;

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

    @action search = query => {
        if (query && query !== this.query) {
            this.reset();
        }
        const queryToSearch = query ? query : this.query;
        if (query) {
            this.query = query;
        }
        this.pending = true;
        this.error = undefined;
        return blogPostService.search(queryToSearch, {page: this.currentPageNumber})
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
import {normalize, schema} from 'normalizr';
import {action, computed, observable, reaction} from 'mobx';
import {blogPostService, createErrorFromResponse} from "../../Api";

const blogPostSchema = new schema.Entity('blogPosts');
const blogPostListSchema = new schema.Array(blogPostSchema);

export default class BlogPostListStore {
    @observable pending = false;
    @observable error = undefined;
    @observable blogPosts = {
        result: [],
        entities: {
            blogPosts: {}
        }
    };
    @observable paginationParams = {
        pageSize: 10,
        sortingDirection: 'DESC',
        sortBy: 'id'
    };
    @observable currentPageNumber = 0;
    @observable blogStore = undefined;
    @observable authStore = undefined;
    @observable createBlogPostStore = undefined;

    @computed get blogId() {
        return this.blogStore.blogId;
    }

    @computed get persistedBlogPost() {
        return this.createBlogPostStore.persistedBlogPost;
    }

    constructor(blogStore, authStore, createBlogPostStore) {
        this.blogStore = blogStore;
        this.authStore = authStore;
        this.createBlogPostStore = createBlogPostStore;

        reaction(
            () => this.paginationParams,
            () => {
                this.currentPageNumber = 0;
                this.blogPosts = {
                    result: [],
                    entities: {
                        blogPosts: {}
                    }
                };
                if (this.blogId) {
                    this.fetchBlogPosts();
                }
            }
        );

        reaction(
            () => this.blogId,
            () => {
                this.currentPageNumber = 0;
                this.blogPosts = {
                    result: [],
                    entities: {
                        blogPosts: {}
                    }
                };
                if (this.blogId) {
                    this.fetchBlogPosts();
                }
            }
        );

        reaction(
            () => this.authStore.loginSuccess,
            () => {
                if (this.authStore.loginSuccess && !this.authStore.previousUser) {
                    this.currentPageNumber = 0;
                    this.blogPosts = {
                        result: [],
                        entities: {
                            blogPosts: {}
                        }
                    };
                    this.fetchBlogPosts();
                }
            }
        );

        reaction(
            () => this.authStore.currentUser,
            () => {
                if (this.blogId && (!this.authStore.currentUser
                        || (this.authStore.previousUser && (this.authStore.currentUser.id !== this.authStore.previousUser.id)))) {
                    this.currentPageNumber = 0;
                    this.blogPosts = {
                        result: [],
                        entities: {
                            blogPosts: {}
                        }
                    };
                    this.fetchBlogPosts();
                }
            }
        );

        reaction(
            () => this.persistedBlogPost,
            () => {
                if (this.persistedBlogPost && this.blogId == this.persistedBlogPost.blogId) {
                    this.blogPosts.result.unshift(this.persistedBlogPost.id);
                    this.blogPosts.entities.blogPosts[this.persistedBlogPost.id] = this.persistedBlogPost;
                }
            }
        )
    }

    @action setCurrentPageNumber = pageNumber => {
        this.currentPageNumber = pageNumber;
    };

    @action setPageSize = pageSize => {
        this.paginationParams = {
            ...this.paginationParams,
            pageSize
        }
    };

    @action setSortingDirection = sortingDirection => {
        this.paginationParams = {
            ...this.paginationParams,
            sortingDirection
        }
    };

    @action setSortBy = sortBy => {
        this.paginationParams = {
            ...this.paginationParams,
            sortBy
        }
    };

    @action fetchBlogPosts = () => {
        this.pending = true;

        return blogPostService.findByBlog(this.blogId, {
            ...this.paginationParams,
            page: this.currentPageNumber
        }).then(response => {
            if (response.data.length !== 0) {
                const normalizedResponse = normalize(response.data, blogPostListSchema);
                this.blogPosts = {
                    ...this.blogPosts,
                    result: this.blogPosts.result.concat(normalizedResponse.result),
                    entities: {
                        blogPosts: {
                            ...this.blogPosts.entities.blogPosts,
                            ...normalizedResponse.entities.blogPosts
                        }
                    }
                };
                this.currentPageNumber = this.currentPageNumber + 1;
            }
        }).catch(error => {
            this.error = createErrorFromResponse(error.response);
        }).then(() => {
            this.pending = false;
        });
    };

    @action setBlogPostLikedByCurrentUser = (id, likedByCurrentUser, blogPostLikeId) => {
        if (this.blogPosts.entities.blogPosts[id]) {
            this.blogPosts.entities.blogPosts[id].likedByCurrentUser = likedByCurrentUser;
            this.blogPosts.entities.blogPosts[id].likeId = blogPostLikeId;
        }
    };

    @action setNumberOfLikes = (id, numberOfLikes) => {
        if (this.blogPosts.entities.blogPosts[id]) {
            this.blogPosts.entities.blogPosts[id].numberOfLikes = numberOfLikes;
        }
    };

    @action deleteBlogPost = id => {
        this.blogPosts = {
            ...this.blogPosts,
            result: this.blogPosts.result.filter(blogPostId => blogPostId !== id)
        }
    }
}
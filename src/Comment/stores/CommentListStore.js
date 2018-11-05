import {normalize, schema} from 'normalizr';
import {action, computed, observable, reaction, toJS} from 'mobx';
import _ from 'lodash';
import localStorage from 'mobx-localstorage';
import CommentsDisplayMode from '../CommentsDisplayMode';
import {commentService, createErrorFromResponse} from "../../Api";

const replySchema = new schema.Entity('replies');
const commentSchema = new schema.Entity('comments', {
    replies: new schema.Array(replySchema)
});
const commentListSchema = new schema.Array(commentSchema);

const PAGES_INITIAL_STATE = {
    pageNumbers: [0],
    pages: {
        0: {
            comments: [],
            tracked: false,
            beingRefreshed: false
        }
    }
};

const COMMENTS_INITIAL_STATE = {
    result: [],
    entities: {
        comments: {},
        replies: {}
    }
};

export default class CommentListStore {
    @observable pages = PAGES_INITIAL_STATE;
    @observable comments = COMMENTS_INITIAL_STATE;
    @observable blogPostStore = undefined;
    @observable paginationParameters = {
        sortingDirection: 'desc',
        sortBy: 'id',
        commentsDisplayMode: localStorage.getItem('commentsDisplayMode') || CommentsDisplayMode.FLAT,
        pageSize: 50
    };
    @observable currentPageNumber = undefined;
    @observable fetchingComments = false;
    @observable error = undefined;
    @observable scheduledTimers = [];
    @observable createCommentStore = undefined;

    @computed get blogPostId() {
        return this.blogPostStore.blogPostId;
    }

    @computed get persistedComment() {
        return this.createCommentStore.persistedComment;
    }

    constructor(blogPostStore, authStore, createCommentStore) {
        this.blogPostStore = blogPostStore;
        this.authStore = authStore;
        this.createCommentStore = createCommentStore;

        reaction(
            () => this.pages,
            () => {
                if (this.blogPostId) {
                    this.pages.pageNumbers.forEach(pageNumber => {
                        if (!this.pages.pages[pageNumber].tracked) {
                            this.pages.pages[pageNumber].tracked = true;
                            this.scheduledTimers.push(setInterval(() => {
                                this.refreshPage(pageNumber)
                            }, 30000))
                        }
                    })
                }
            }
        );

        reaction(
            () => this.blogPostId,
            () => {
                this.scheduledTimers.forEach(timer => {
                    clearInterval(timer);
                });
                this.pages = PAGES_INITIAL_STATE;
                this.comments = COMMENTS_INITIAL_STATE;
                this.currentPageNumber = 0;

                if (this.blogPostId) {
                    this.fetchComments();
                }
            }
        );

        reaction(
            () => this.authStore.loginSuccess,
            () => {
                if (this.authStore.loginSuccess && !this.authStore.previousUser) {
                    this.scheduledTimers.forEach(timer => {
                        clearInterval(timer);
                    });
                    this.currentPageNumber = 0;
                    this.pages = PAGES_INITIAL_STATE;
                    this.comments = COMMENTS_INITIAL_STATE;

                    if (this.blogPostId) {
                        this.fetchComments();
                    }
                }
            }
        );

        reaction(
            () => this.authStore.currentUser,
            () => {
                if (this.blogPostId && (!this.authStore.currentUser
                    || (this.authStore.previousUser && (this.authStore.currentUser.id !== this.authStore.previousUser.id)))) {
                    this.scheduledTimers.forEach(timer => {
                        clearInterval(timer);
                    });
                    this.currentPageNumber = 0;
                    this.pages = PAGES_INITIAL_STATE;
                    this.comments = COMMENTS_INITIAL_STATE;
                    this.fetchComments();
                }
            }
        );

        reaction(
            () => this.persistedComment,
            () => {
                if (this.persistedComment) {
                    this.addComment();
                }
            }
        );

        reaction(
            () => this.paginationParameters.commentsDisplayMode,
            () => {
                this.comments = COMMENTS_INITIAL_STATE;
                this.currentPageNumber = 0;
                this.fetchComments();
            }
        )
    }

    @action fetchComments = () => {
        this.fetchingComments = true;

        return commentService.findByBlogPost(this.blogPostId, {
            ...this.paginationParameters,
            page: this.currentPageNumber
        }).then(response => {
            if (response.data.length !== 0) {
                this.pages.pageNumbers.push(this.currentPageNumber);
                this.pages.pages[this.currentPageNumber] = {
                    comments: response.data.map(comment => comment.id),
                    tracked: false,
                    beingRefreshed: false
                };
                const normalizedResponse = normalize(response.data, commentListSchema);
                this.comments = {
                    ...this.comments,
                    result: this.comments.result.concat(normalizedResponse.result),
                    entities: {
                        comments: {
                            ...this.comments.entities.comments,
                            ...normalizedResponse.entities.comments
                        },
                        replies: {
                            ...this.comments.entities.replies,
                            ...normalizedResponse.entities.replies
                        }
                    }
                };
                this.currentPageNumber = this.currentPageNumber + 1;
                console.log(toJS(this.comments));
            } else if (this.currentPageNumber === 0) {
                this.pages.pageNumbers.push(0);
                this.pages.pageNumbers[0] = {
                    comments: [],
                    tracked: false,
                    beingRefreshed: false
                }
            }
        }).catch(error => {
            this.error = createErrorFromResponse(error.response);
        }).then(() => {
            this.fetchingComments = false;
        })
    };

    @action refreshPage = pageNumber => {
        this.pages.pages[pageNumber].beingRefreshed = true;

        return commentService.findByBlogPost(this.blogPostId, {
            ...this.paginationParameters,
            page: pageNumber
        }).then(response => {
            this.pages.pages[pageNumber] = {
                ...this.pages.pages[pageNumber],
                comments: response.data.map(comment => comment.id)
            };
            const normalizedResponse = normalize(response.data, commentListSchema);
            this.comments = {
                ...this.comments,
                result: _.union(normalizedResponse.result, this.comments.result),
                entities: {
                    comments: {
                        ...this.comments.entities.comments,
                        ...normalizedResponse.entities.comments
                    },
                    replies: {
                        ...this.comments.entities.replies,
                        ...normalizedResponse.entities.replies
                    }
                }
            }
        }).catch(error => {
            this.error = createErrorFromResponse(error.response);
        }).then(() => {
            this.pages.pages[pageNumber].beingRefreshed = false;
        })
    };

    @action setCommentLikedByCurrentUser = (id, likedByCurrentUser, commentLikeId) => {
        if (this.comments.entities.comments[id]) {
            this.comments.entities.comments[id].likedByCurrentUser = likedByCurrentUser;
            this.comments.entities.comments[id].likeId = commentLikeId;
        } else if (this.comments.entities.replies[id]) {
            this.comments.entities.replies[id].likedByCurrentUser = likedByCurrentUser;
            this.comments.entities.replies[id].likeId = commentLikeId;
        }
    };

    @action setNumberOfLikes = (id, numberOfLikes) => {
        if (this.comments.entities.comments[id]) {
            this.comments.entities.comments[id].numberOfLikes = numberOfLikes;
        } else if (this.comments.entities.replies[id]) {
            this.comments.entities.replies[id].numberOfLikes = numberOfLikes;
        }
    };

    @action removeComment = id => {
        if (this.comments.entities.comments[id]) {
            this.comments.entities.comments[id].deleted = true;
            this.comments.entities.comments[id].deletedByUserId = this.authStore.currentUser
                && this.authStore.currentUser.id;
        } else if (this.comments.entities.replies[id]) {
            this.comments.entities.replies[id].deleted = true;
            this.comments.entities.replies[id].deletedByUserId = this.authStore.currentUser
                && this.authStore.currentUser.id;
        }
    };

    @action restoreComment = (id, comment) => {
        if (this.comments.entities.comments[id]) {
            this.comments.entities.comments[id] = comment;
        } else if (this.comments.entities.replies[id]) {
            this.comments.entities.replies[id] = comment;
        }
    };

    @action addComment = () => {
        if (this.paginationParameters.commentsDisplayMode === CommentsDisplayMode.FLAT) {
           this.addCommentForFlatDisplayMode();
        } else {
            this.addCommentForCommentWithRepliesDisplayMode();
        }
    };

    @action addCommentForFlatDisplayMode = () => {
        if (this.paginationParameters.sortingDirection === 'desc') {
            this.comments.result = _.union([this.persistedComment.id], this.comments.result);
        } else {
            this.comments.result = _.union(this.comments.result, [this.persistedComment.id]);
        }
        this.comments.entities = {
            ...this.comments.entities,
            comments: {
                ...this.comments.entities.comments,
                [this.persistedComment.id]: this.persistedComment
            }
        }
    };

    @action addCommentForCommentWithRepliesDisplayMode = () => {
        if (this.persistedComment.rootCommentId) {
            this.comments.entities = {
                ...this.comments.entities,
                comments: {
                    ...this.comments.entities.comments,
                    [this.persistedComment.rootCommentId]: {
                        ...this.comments.entities.comments[this.persistedComment.rootCommentId],
                        replies: _.union(this.comments.entities.comments[this.persistedComment.rootCommentId].replies,
                            [this.persistedComment.id])
                    }
                },
                replies: {
                    ...this.comments.entities.replies,
                    [this.persistedComment.id]: this.persistedComment
                }
            };
        } else {
            this.addCommentForFlatDisplayMode();
        }
    };

    @action setCommentsDisplayMode = commentsDisplayMode => {
        localStorage.setItem('commentsDisplayMode', commentsDisplayMode);
        this.paginationParameters.commentsDisplayMode = commentsDisplayMode;
    }
}
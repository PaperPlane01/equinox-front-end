import {observable, action, reaction, computed, toJS, trace} from 'mobx';
import {normalize, denormalize} from 'normalizr';
import {commentSchema, commentListSchema} from "./schemas";
import {commentService} from "../../Api/services";
import {isValidNumericalId} from "../../utils";

const HIGHLIGHTED_COMMENT_INITIAL_STATE = {
    result: undefined,
    entities: {
        comments: {},
        replies: {}
    }
};

export default class RootCommentAtTopStore {
    @observable createCommentStore = undefined;
    @observable commentLikeStore = undefined;
    @observable deleteCommentStore = undefined;
    @observable restoreCommentStore = undefined;
    @observable normalizedRootCommentAtTop = HIGHLIGHTED_COMMENT_INITIAL_STATE;
    @observable rootCommentAtTopId = undefined;
    @observable highlightedCommentId = undefined;

    @computed get rootCommentAtTop() {
        return this.rootCommentAtTopId && this.normalizedRootCommentAtTop.result !== undefined
            ? denormalize(this.normalizedRootCommentAtTop.result, commentSchema, this.normalizedRootCommentAtTop.entities)
            : undefined;
    }

    @computed get commentLikeDeletionOrCreationResult() {
        return this.commentLikeStore.result;
    }

    @computed get persistedComment() {
        return this.createCommentStore.persistedComment;
    }

    @computed get restoredComment() {
        return this.restoreCommentStore.restoredComment;
    }

    @computed get deletedCommentId() {
        return this.deleteCommentStore.deletedCommentId;
    }

    constructor(createCommentStore, commentLikeStore, deleteCommentStore, restoreCommentStore) {
        this.createCommentStore = createCommentStore;
        this.commentLikeStore = commentLikeStore;
        this.deleteCommentStore = deleteCommentStore;
        this.restoreCommentStore = restoreCommentStore;
        trace(this.normalizedRootCommentAtTop.entities, 'replies');

        reaction(
            () => this.highlightedCommentId,
            () => {
                if (this.rootCommentAtTopId) {
                    this.fetchThread(this.rootCommentAtTopId);
                }
            }
        );

        reaction(
            () => this.persistedComment,
            persistedComment => {
                if (this.rootCommentAtTopId && persistedComment
                    && persistedComment.rootCommentId === this.rootCommentAtTopId) {
                    this.addReplyToRootCommentAtTop(persistedComment);
                }
            }
        );

        reaction(
            () => this.deletedCommentId,
            deletedCommentId => {
                if (this.rootCommentAtTopId && this.deletedCommentId) {
                    if (this.rootCommentAtTopId === deletedCommentId) {
                        this.removeRootCommentAtTop();
                    } else if (this.normalizedRootCommentAtTop.entities.replies[deletedCommentId]) {
                        this.removeReplyToRootCommentAtTop(deletedCommentId);
                    }
                }
            }
        );

        reaction(
            () => this.commentLikeDeletionOrCreationResult,
            result => {
                if (this.rootCommentAtTopId && result.commentId) {
                    if (this.rootCommentAtTopId === result.commentId) {
                        this.setRootCommentAtTopLikedByCurrentUser(
                            Boolean(result.likeId),
                            result.likeId,
                            result.numberOfLikes
                        )
                    } else if (this.normalizedRootCommentAtTop.entities.replies[result.commentId]) {
                        this.setReplyToRootCommentAtTopLikedByCurrentUser(
                            result.commentId,
                            Boolean(result.likeId),
                            result.likeId,
                            result.numberOfLikes
                        )
                    }
                }
            }
        )
    }

    @action fetchRootCommentAtTop = id => {
        if (isValidNumericalId(id)) {
            return commentService.findById(id)
                .then(response => {
                    const normalizedResponse = normalize(response.data, commentSchema);
                    normalizedResponse.entities.replies = {};
                    normalizedResponse.entities.comments[id].replies = [];
                    console.log(normalizedResponse);
                    this.normalizedRootCommentAtTop = {...normalizedResponse};
                    this.rootCommentAtTopId = id;
                    this.fetchThread(id);
                })
        }
    };

    @action fetchThread = rootCommentId => {
        if (this.normalizedRootCommentAtTop.entities.comments[rootCommentId]) {
            return commentService.getThread(rootCommentId)
                .then(response => {
                    if (response.data.length !== 0) {
                        const normalizedResponse = normalize(response.data, commentListSchema);
                        this.normalizedRootCommentAtTop.entities.replies = {
                            ...normalizedResponse.entities.comments
                        };
                        this.normalizedRootCommentAtTop.entities.comments[rootCommentId].replies = [
                            ...normalizedResponse.result
                        ];
                    }
                })
        }
    };

    @action addReplyToRootCommentAtTop = reply => {
        this.normalizedRootCommentAtTop.entities.replies = {
            ...this.normalizedRootCommentAtTop.entities.replies,
            [reply.id]: {...reply}
        };
        this.normalizedRootCommentAtTop.entities.comments[this.rootCommentAtTopId].replies = [
            ...this.normalizedRootCommentAtTop.entities.comments[this.rootCommentAtTopId].replies,
            reply.id
        ];
    };

    @action setRootCommentAtTopLikedByCurrentUser = (likedByCurrentUser, commentLikeId, numberOfLikes) => {
        this.normalizedRootCommentAtTop.entities.comments[this.rootCommentAtTopId].likedByCurrentUser = likedByCurrentUser;
        this.normalizedRootCommentAtTop.entities.comments[this.rootCommentAtTopId].likeId = commentLikeId;
        this.normalizedRootCommentAtTop.entities.comments[this.rootCommentAtTopId].numberOfLikes = numberOfLikes;
    };

    @action setReplyToRootCommentAtTopLikedByCurrentUser = (replyId, likedByCurrentUser, commentLikeId, numberOfLikes) => {
        this.normalizedRootCommentAtTop.entities.replies[replyId].likedByCurrentUser = likedByCurrentUser;
        this.normalizedRootCommentAtTop.entities.replies[replyId].likeId = commentLikeId;
        this.normalizedRootCommentAtTop.entities.replies[replyId].numberOfLikes = numberOfLikes;
    };

    @action removeRootCommentAtTop = () => {
        this.normalizedRootCommentAtTop.entities.comments[this.rootCommentAtTopId].deleted = true;
    };

    @action removeReplyToRootCommentAtTop = id => {
        this.normalizedRootCommentAtTop.entities.replies[id].deleted = true;
    };

    @action restoreRootCommentAtTop = restoredComment => {
        delete restoredComment.replies;
        this.normalizedRootCommentAtTop.entities.comments[this.rootCommentAtTopId] = {
            ...this.normalizedRootCommentAtTop.entities.comments[this.rootCommentAtTopId],
            ...restoredComment
        };
        this.normalizedRootCommentAtTop.entities.comments[this.rootCommentAtTopId].deleted = false;
    };

    @action restoreReplyToRootCommentAtTop = restoredComment => {
        delete restoredComment.replies;
        this.normalizedRootCommentAtTop.entities.replies[restoredComment.id] = {
            ...this.normalizedRootCommentAtTop.entities.comments[restoredComment.id],
            ...restoredComment
        }
    };

    @action setHighlightedCommentId = id => {
        if (isValidNumericalId(id)) {
            this.highlightedCommentId = parseInt(id);
        }
    };

    @action reset = () => {
        this.rootCommentAtTopId = undefined;
        this.highlightedCommentId = undefined;
        this.normalizedRootCommentAtTop = HIGHLIGHTED_COMMENT_INITIAL_STATE;
    }
}
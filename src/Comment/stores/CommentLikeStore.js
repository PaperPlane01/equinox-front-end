import {observable, action} from 'mobx';
import {commentLikeService, createErrorFromResponse} from "../../Api";

export default class CommentLikeStore {
    @observable pending = false;
    @observable error = undefined;
    @observable commentListStore = undefined;
    @observable result = {
        commentId: undefined,
        numberOfLikes: undefined,
        likeId: undefined
    };

    constructor(commentListStore) {
        this.commentListStore = commentListStore;
    }

    @action createCommentLike = commentId => {
        this.pending = true;
        this.error = undefined;

        return commentLikeService.save({commentId})
            .then(response => {
                this.result = {
                    commentId,
                    numberOfLikes: response.data.updatedNumberOfLikes,
                    likeId: response.data.commentLikeId
                };
                this.commentListStore.setCommentLikedByCurrentUser(commentId, true, response.data.commentLikeId);
                this.commentListStore.setNumberOfLikes(commentId, response.data.updatedNumberOfLikes);
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    };

    @action deleteCommentLike = (commentId, commentLikeId) => {
        this.pending = true;
        this.error = undefined;

        return commentLikeService.delete(commentLikeId)
            .then(response => {
                this.result = {
                    commentId,
                    numberOfLikes: response.data.updatedNumberOfLikes,
                    likeId: undefined
                };
                this.commentListStore.setCommentLikedByCurrentUser(commentId, false);
                this.commentListStore.setNumberOfLikes(commentId, response.data.updatedNumberOfLikes);
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    }
}
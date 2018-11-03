import {observable, action} from 'mobx';
import {commentService, createErrorFromResponse} from "../../Api";

export default class RestoreCommentStore {
    @observable pending = false;
    @observable error = undefined;
    @observable restoredComment = undefined;
    @observable commentListStore = undefined;

    constructor(commentListStore) {
        this.commentListStore = commentListStore;
    }

    @action restoreComment = id => {
        this.error = undefined;
        this.pending = true;

        return commentService.restore(id)
            .then(response => {
                this.restoredComment = response.data;
                this.commentListStore.restoreComment(id, this.restoredComment);
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    }
}
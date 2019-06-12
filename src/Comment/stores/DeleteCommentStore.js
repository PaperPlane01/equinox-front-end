import {observable, action} from 'mobx';
import {commentService, createErrorFromResponse} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'commentListStore'}
    ],
    order: Component.Order.HIGH - 1
})
class DeleteCommentStore {
    @observable pending = false;
    @observable error = undefined;
    @observable commentListStore = undefined;
    @observable deletedCommentId = undefined;

    @action deleteComment = id => {
        this.error = undefined;
        this.pending = true;
        console.log('deleting comment (in store)');

        return commentService.delete(id)
            .then(() => {
                this.deletedCommentId = id;
                this.commentListStore.removeComment(id);
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    }
}

export default DeleteCommentStore;
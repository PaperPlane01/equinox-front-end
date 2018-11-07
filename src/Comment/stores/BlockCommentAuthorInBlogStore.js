import {observable, action} from 'mobx';

export default class BlockCommentAuthorInBlogStore {
    @observable commentId = undefined;

    @action setCommentId = id => {
        this.commentId = id;
    }
}
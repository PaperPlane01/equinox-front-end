import {action, observable} from 'mobx';

export default class BlockCommentAuthorGloballyStore {
    @observable commentId = undefined;

    @action setCommentId = id => {
        this.commentId = id;
    }
}
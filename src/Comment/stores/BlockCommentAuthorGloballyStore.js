import {action, observable} from 'mobx';
import {Component} from "../../simple-ioc";

@Component({
    order: Component.Order.LOW
})
class BlockCommentAuthorGloballyStore {
    @observable commentId = undefined;

    @action setCommentId = id => {
        this.commentId = id;
    }
}

export default BlockCommentAuthorGloballyStore;
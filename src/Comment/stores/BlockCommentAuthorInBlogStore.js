import {observable, action} from 'mobx';
import {Component} from "../../simple-ioc";

@Component({
    order: Component.Order.LOW
})
class BlockCommentAuthorInBlogStore {
    @observable commentId = undefined;

    @action setCommentId = id => {
        this.commentId = id;
    }
}
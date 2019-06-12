import {action, reaction, observable} from 'mobx';
import {createErrorFromResponse, blogPostService} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    order: Component.Order.LOWEST
})
class UnpinBlogPostStore {
    @observable blogPostId = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable unpinnedBlogPost = undefined;
    @observable shouldShowSnackBar = false;

    constructor() {
        reaction(
            () => this.unpinnedBlogPost,
            blogPost => {
                if (blogPost) {
                    this.shouldShowSnackBar = true;
                }
            }
        );

        reaction(
            () => this.error,
            error => {
                if (error) {
                    this.shouldShowSnackBar = true;
                }
            }
        )
    }

    @action setShouldShowSnackBar = shouldShowSnackBar => {
        this.shouldShowSnackBar = shouldShowSnackBar;
    };

    @action setBlogPostId = id => {
        this.blogPostId = id;
    };

    @action unpinBlogPost = () => {
        this.error = undefined;
        this.pending = false;
        this.unpinnedBlogPost = undefined;

        return blogPostService.unpin(this.blogPostId)
            .then(response => {
                this.unpinnedBlogPost = response.data;
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            });
    }
}

export default UnpinBlogPostStore;
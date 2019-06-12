import {observable, action, reaction} from 'mobx';
import {createErrorFromResponse, blogPostService} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    order: Component.Order.LOWEST
})
class PinBlogPostStore {
    @observable blogPostId = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable pinnedBlogPost = undefined;
    @observable shouldShowSnackBar = false;

    constructor() {
        reaction(
            () => this.pinnedBlogPost,
            blogPost => {
                if (blogPost) {
                    this.shouldShowSnackBar = true;
                    console.log('set shouldShowShackBar to true')
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

    @action pinBlogPost = () => {
        this.pending = true;
        this.error = undefined;
        this.pinnedBlogPost = undefined;

        return blogPostService.pin(this.blogPostId)
            .then(response => {
                this.pinnedBlogPost = response.data;
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    }
}

export default PinBlogPostStore;
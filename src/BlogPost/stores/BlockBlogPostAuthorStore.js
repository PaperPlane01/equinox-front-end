import {observable, action, reaction} from 'mobx';
import {createErrorFromResponse, blogPostService} from "../../Api";

export default class BlockBlogPostAuthorStore {
    @observable blogPostId = undefined;
    @observable blogPostPublisher = undefined;
    @observable blogPostAuthor = undefined;
    @observable pending = false;
    @observable error = undefined;
    @observable createGlobalBlockingStore = undefined;

    constructor(createGlobalBlockingStore) {
        this.createGlobalBlockingStore = createGlobalBlockingStore;

        reaction(
            () => this.blogPostId,
            () => {
                if (this.blogPostId) {
                    if (this.blogPostPublisher.type === 'BLOG') {
                        this.fetchBlogPostAuthor();
                    } else {
                        this.blogPostAuthor = this.blogPostPublisher;
                        this.createGlobalBlockingStore.setBlockedUser(this.blogPostAuthor);
                    }
                }
            }
        )
    }

    @action setBlogPostId = id => {
        this.blogPostId = id;
    };

    @action setBlogPostPublisher = publisher => {
        this.blogPostPublisher = publisher;
    };

    @action fetchBlogPostAuthor = () => {
        this.pending = true;
        this.error = undefined;

        return blogPostService.getAuthorOfBlogPost(this.blogPostId)
            .then(response => {
                this.blogPostAuthor = response.data;
                this.createGlobalBlockingStore.setBlockedUser(this.blogPostAuthor);
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    }
}
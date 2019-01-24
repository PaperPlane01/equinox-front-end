import React from 'react';
import {inject, observer} from 'mobx-react';
import {withSnackbar} from 'notistack';
import {withLocale} from "../../localization";

export default WrappedComponent => {
    return @withSnackbar
    @withLocale
    @inject('unpinBlogPostStore')
    @observer class BlogPostUnpinnedSnackBar extends React.Component {
        render() {
            const {unpinBlogPostStore, enqueueSnackbar, l, blogPost} = this.props;
            const {unpinnedBlogPost, shouldShowSnackBar} = unpinBlogPostStore;

            if (unpinnedBlogPost && shouldShowSnackBar && unpinnedBlogPost.id === blogPost.id) {
                enqueueSnackbar(l('blogPostUnpinned'));
                unpinBlogPostStore.setShouldShowSnackBar(false);
            }

            return <WrappedComponent {...this.props}/>
        }
    }
}
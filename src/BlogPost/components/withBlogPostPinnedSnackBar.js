import React from 'react';
import {inject, observer} from 'mobx-react';
import {withSnackbar} from 'notistack';
import {withLocale} from "../../localization";

export default WrappedComponent => {
    return @withSnackbar
    @withLocale
    @inject('pinBlogPostStore')
    @observer class PinnedBlogPostSnackBar extends React.Component {
        render() {
            const {pinBlogPostStore, enqueueSnackbar, l, blogPost} = this.props;
            const {pinnedBlogPost, shouldShowSnackBar} = pinBlogPostStore;

            if (pinnedBlogPost && shouldShowSnackBar && pinnedBlogPost.id === blogPost.id) {
                enqueueSnackbar(l('blogPostPinned'));
                pinBlogPostStore.setShouldShowSnackBar(false);
            }

            return <WrappedComponent {...this.props}/>
        }
    }
}
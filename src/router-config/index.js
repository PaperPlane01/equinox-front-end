import React from 'react';
import {Route} from 'mobx-router';
import {
    Home,
    CreateBlog,
    EditProfile,
    User,
    Blog,
    BlogPost,
    BlogSubscribers,
    Feed,
    BlogBlockings,
    GoogleAuth,
    BlogManagers,
    NotFound,
    EditBlogPost,
    GlobalBlockings,
    Search,
    CommentReports,
    BlogPostReports,
    ConfirmEmail
} from '../screens';
import appStore from '../store';
import _getViewByPath from './getViewByPath';
import {isBlank} from "../utils";

export const getViewByPath = _getViewByPath;

export default {
    home: new Route({
        path: '/',
        component: <Home/>,
        onEnter: () => {
            appStore.mostPopularBlogPostsStore.fetchMostPopularBlogPosts();
        },
        onExit: () => {
            appStore.mostPopularBlogPostsStore.reset();
        }
    }),
    createBlog: new Route({
        path: '/create-blog',
        component: <CreateBlog/>
    }),
    editProfile: new Route({
        path: '/edit-profile',
        component: <EditProfile/>,
        onEnter: (route, params, store, queryParams) => {
            let tab = queryParams ? queryParams.tab : undefined;

            if (isBlank(tab)) {
                tab = 'generalInfo';
            }

            appStore.editProfileStore.setSelectedTab(tab);
        },
        onParamsChange: (route, params, store, queryParams) => {
            let tab = queryParams ? queryParams.tab : undefined;

            if (isBlank(tab)) {
                tab = 'generalInfo';
            }

            appStore.editProfileStore.setSelectedTab(tab);
        }
    }),
    userProfile: new Route({
        path: '/user/:id',
        component: <User/>,
        onEnter: (route, params) => {
            appStore.userProfileStore.setUserId(params.id);
        },
        onParamsChange: (route, params) => {
            appStore.userProfileStore.setUserId(params.id);
        }
    }),
    blog: new Route({
        path: '/blog/:id',
        component: <Blog/>,
        onEnter: (route, params) => {
            appStore.blogStore.setBlogId(params.id);
            appStore.createBlogPostStore.setBlogId(params.id);
        },
        onParamsChange: (route, params) => {
            appStore.blogStore.setBlogId(params.id);
            appStore.createBlogPostStore.setBlogId(params.id);
        },
        onExit: () => {
            appStore.blogStore.reset()
        }
    }),
    blogPost: new Route({
        path: '/blog-post/:id',
        component: <BlogPost/>,
        onEnter: (route, params, store, queryParams) => {
            appStore.blogPostStore.setBlogPostId(params.id);
            appStore.highlightedCommentStore.fetchRootCommentAtTop(queryParams.rootCommentAtTopId);
            appStore.highlightedCommentStore.setHighlightedCommentId(queryParams.highlightedCommentId);
        },
        onParamsChange: (route, params, store, queryParams) => {
            appStore.blogPostStore.setBlogPostId(params.id);
            appStore.highlightedCommentStore.fetchRootCommentAtTop(queryParams.rootCommentAtTopId);
            appStore.highlightedCommentStore.setHighlightedCommentId(queryParams.highlightedCommentId);
        },
        onExit: () => {
            appStore.blogPostStore.reset();
            appStore.highlightedCommentStore.reset();
        }
    }),
    googleAuth: new Route({
        path: '/auth/google',
        component: <GoogleAuth/>,
        onEnter: (route, params, store) => {
            appStore.googleAuthStore.setGoogleToken(store.router.queryParams.access_token);
        }
    }),
    blogSubscribers: new Route({
        path: '/blog/:id/subscribers',
        component: <BlogSubscribers/>,
        onEnter: (route, params) => {
            appStore.blogSubscribersListStore.setBlogId(params.id);
        },
        onParamsChange: (route, params) => {
            appStore.blogSubscribersListStore.setBlogId(params.id);
        },
        onExit: () => {
            appStore.blogSubscribersListStore.reset();
        }
    }),
    feed: new Route({
        path: '/feed',
        component: <Feed/>,
        onEnter: () => {
            appStore.feedStore.setShouldRefresh(true)
        },
        onExit: () => {
            appStore.feedStore.setShouldRefresh(false);
        }
    }),
    blogBlockings: new Route({
        path: '/blog/:blogId/blockings',
        component: <BlogBlockings/>,
        onEnter: (route, params) => {
            appStore.blogBlockingsStore.setBlogId(params.blogId);
        },
        onParamsChange: (route, params) => {
            appStore.blogBlockingsStore.setBlogId(params.blogId);
        },
        onExit: () => {
            appStore.blogBlockingsStore.reset();
        }
    }),
    blogManagers: new Route({
        path: '/blog/:blogId/managers',
        component: <BlogManagers/>,
        onEnter: (route, params) => {
            appStore.blogManagersStore.setBlogId(params.blogId);
            appStore.updateBlogManagerStore.setBlogId(params.blogId);
        },
        onParamsChange: (route, params) => {
            appStore.blogManagersStore.setBlogId(params.blogId);
            appStore.updateBlogManagerStore.setBlogId(params.blogId);
        },
        onExit: () => {
            appStore.blogManagersStore.reset();
        }
    }),
    notFound: new Route({
        path: '/404',
        component: <NotFound/>
    }),
    editBlogPost: new Route({
        path: '/blog-post/:id/edit',
        component: <EditBlogPost/>,
        onEnter: (route, params) => {
            appStore.updateBlogPostStore.setBlogPostId(params.id);
        },
        onParamsChange: (route, params) => {
            appStore.updateBlogPostStore.setBlogPostId(params.id);
        },
        onExit: () => {
            appStore.updateBlogPostStore.reset();
        }
    }),
    globalBlockings: new Route({
        path: '/global-blockings',
        component: <GlobalBlockings/>,
        onEnter: () => {
            appStore.globalBlockingsStore.setShouldReloadGlobalBlockingsOnCurrentUserChange(true);
            appStore.globalBlockingsStore.fetchGlobalBlockings();
        },
        onExit: () => {
            appStore.globalBlockingsStore.reset();
            appStore.globalBlockingsStore.setShouldReloadGlobalBlockingsOnCurrentUserChange(false);
        }
    }),
    search: new Route({
        path: '/search',
        component: <Search/>,
        onEnter: (router, params, store, queryParams) => {
            let tags = Array.isArray(queryParams.tags)
                ? queryParams.tags
                : [queryParams.tags];
            appStore.searchBlogPostsStore.reset();
            appStore.searchBlogPostsStore.searchByQueryAndTags(queryParams.query, tags);
        },
        onParamsChange: (router, params, store, queryParams) => {
            let tags = Array.isArray(queryParams.tags)
                ? queryParams.tags
                : [queryParams.tags];
            appStore.searchBlogPostsStore.reset();
            appStore.searchBlogPostsStore.searchByQueryAndTags(queryParams.query, tags);
        },
        onExit: () => {
            appStore.searchBlogPostsStore.reset();
        }
    }),
    commentReports: new Route({
        path: '/comment-reports',
        component: <CommentReports/>,
        onEnter: () => {
            appStore.commentReportListStore.setFetchReportsOnUserChange(true);
            appStore.commentReportListStore.fetchCommentReports();
        },
        onExit: () => {
            appStore.commentReportListStore.setFetchReportsOnUserChange(false);
            appStore.commentReportListStore.reset();
        }
    }),
    blogPostReports: new Route({
        path: '/blog-post-reports',
        component: <BlogPostReports/>,
        onEnter: () => {
            appStore.blogPostReportListStore.setFetchReportsOnUserChange(true);
            appStore.blogPostReportListStore.fetchBlogPostReports();
        },
        onExit: () => {
            appStore.blogPostReportListStore.setFetchReportsOnUserChange(false);
            appStore.blogPostReportListStore.reset();
        }
    }),
    confirmEmail: new Route({
        path: '/confirm-email',
        component: <ConfirmEmail/>,
        onEnter: (route, params, store, queryParams) => {
            appStore.confirmEmailStore.confirmEmail(queryParams.confirmationId);
        },
        onExit: () => {
            appStore.confirmEmailStore.reset();
        }
    })
};

import React from 'react';
import {Route} from 'mobx-router';
import {Home, CreateBlog, EditProfile, User, Blog, BlogPost, BlogSubscribers, Feed,
    BlogBlockings, GoogleAuth, BlogManagers, NotFound} from '../screens';
import appStore from '../store';
import _getViewByPath from './getViewByPath';
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
        onEnter: () => appStore.editProfileStore.fetchCurrentUserProfile()
    }),
    userProfile: new Route({
        path: '/user/:id',
        component: <User/>,
        onEnter: (route, params) => {
            appStore.userProfileStore.setUserId(params.id)
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
        onEnter: (route, params) => {
            appStore.blogPostStore.setBlogPostId(params.id);
        },
        onParamsChange: (route, params) => {
            appStore.blogPostStore.setBlogPostId(params.id);
        },
        onExit: () => {
            appStore.blogPostStore.reset();
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
        onParamsChange: () => {
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
    })
};

import React from 'react';
import {Route} from 'mobx-router';
import {Home, CreateBlog, EditProfile, User, Blog, BlogPost, BlogSubscribers} from '../screens';
import appStore from '../store';

export default {
    home: new Route({
        path: '/',
        component: <Home/>
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
    })
};


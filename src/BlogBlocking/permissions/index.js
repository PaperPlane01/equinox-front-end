import {toJS} from 'mobx';

export const canUpdateBlogBlocking = (currentUser, blogBlocking) => {
    return currentUser && (
        currentUser.ownedBlogs.includes(blogBlocking.blog.id)
        || (currentUser.managedBlogs.map(managedBlog => managedBlog.blogId).includes(blogBlocking.blog.id)
            && currentUser.id === blogBlocking.blockedBy.id)
    )
};

export const canDeleteBlogBlocking = (currentUser, blogBlocking) => {
    return canUpdateBlogBlocking(currentUser, blogBlocking);
};

export const canSeeUsersBlockedInBlog = (currentUser, blogId) => {
    return currentUser && (
        currentUser.ownedBlogs.includes(blogId)
        || currentUser.managedBlogs
            .filter(managedBlog => managedBlog.blogId == blogId).length !== 0
    );
};
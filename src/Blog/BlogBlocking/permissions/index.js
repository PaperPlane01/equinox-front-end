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
    if (currentUser) {
        console.log("current user: ");
        console.log(toJS(currentUser));
        console.log("blog id: ");
        console.log(blogId);
        console.log(currentUser.ownedBlogs.includes(blogId));
        console.log(currentUser.ownedBlogs.map(id => "" + id).includes("" + blogId));
        console.log(currentUser.ownedBlogs.filter(id => id == blogId));
    }

    return currentUser && (
        currentUser.ownedBlogs.map(id => "" + id).includes("" + blogId)
        || currentUser.managedBlogs.map(managedBlog => managedBlog.blogId).includes(blogId)
    )
};
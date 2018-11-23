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
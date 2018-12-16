export const canUpdateBlogManager = (currentUser, blogId) => {
    return currentUser && currentUser.ownedBlogs.includes(blogId);
};

export const canDeleteBlogManager = (currentUser, blogId) => {
    return currentUser && currentUser.ownedBlogs.includes(blogId);
};
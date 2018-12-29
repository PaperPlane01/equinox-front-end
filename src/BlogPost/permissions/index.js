export const canCreateBlogPost = (currentUser, blogId) => {
    return currentUser
        && (!currentUser.blockedGlobally
            && (currentUser.ownedBlogs.includes(blogId)
                || currentUser.managedBlogs.filter(managedBlog => managedBlog.blogRole === 'EDITOR')
                    .map(managedBlog => managedBlog.id).includes(blogId)
            )
        );
};

export const canDeleteBlogPost = (currentUser, blogPost) => {
    return currentUser && blogPost.canBeDeleted;
};

export const canEditBlogPost = (currentUser, blogPost) => {
    return currentUser && blogPost.canBeEdited;
};
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
    return currentUser && (currentUser.authorities.map(authority => authority.name).includes('ROLE_ADMIN')
        || currentUser.ownedBlogs.includes(blogPost.blogId)
        || (currentUser.managedBlogs
            .filter(managedBlog => managedBlog.blogId === blogPost.blogId && managedBlog.blogRole === 'EDITOR')
        && blogPost.publisher.id === currentUser.id));
};
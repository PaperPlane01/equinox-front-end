export const canCreateComment = (currentUser, blogId) => {
    return currentUser && (currentUser.managedBlogs.map(managedBlog => managedBlog.blogId).includes(blogId)
        || currentUser.ownedBlogs.includes(blogId)
        || !currentUser.blockedInBlogs.includes(blogId));
};

export const canDeleteComment = (currentUser, comment) => {
    return currentUser && !comment.deleted && (
        currentUser.authorities.map(authority => authority.name).includes('ROLE_ADMIN')
        || currentUser.managedBlogs.map(managedBlog => managedBlog.blogId).includes(comment.blogId)
        || currentUser.ownedBlogs.includes(comment.blogId)
        || (!currentUser.blockedGlobally && !currentUser.blockedInBlogs.includes(comment.blogId)
            && currentUser.id === comment.author.id)
    )
};

export const canUpdateComment = (currentUser, comment) => {
    return currentUser && (
        !currentUser.blockedGlobally && currentUser.id === comment.author.id
        && !currentUser.blockedInBlogs.includes(comment.blogId)
    )
};

export const canRestoreComment = (currentUser, comment) => {
    return currentUser && comment.deletedByUserId === currentUser.id;
};
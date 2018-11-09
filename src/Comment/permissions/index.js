export const canCreateComment = (currentUser, blogId) => {
    return currentUser && !currentUser.blockedInBlogs.includes(blogId);
};

export const canDeleteComment = (currentUser, comment) => {
    return currentUser && !comment.deleted && (
        currentUser.authorities.includes('ROLE_ADMIN')
        || currentUser.managedBlogs.filter(managedBlog => managedBlog.id === comment.blogId).length !== 0
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
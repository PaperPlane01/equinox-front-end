import BlogManagersVisibilityLevel from '../BlogManagersVisibilityLevel';
import appStore from '../stores';

export const canCreateBlogPost = (currentUser, blogId) => {
    return currentUser
        && (!currentUser.blockedGlobally
        && (currentUser.ownedBlogs.includes(blogId)
        || currentUser.managedBlogs.filter(managedBlog => managedBlog.blogRole === 'EDITOR')
            .map(managedBlog => managedBlog.id).includes(blogId)
            )
        );
};

export const canSeeBlogManagers = (currentUser, blog) => {
    switch (blog.blogManagersVisibilityLevel) {
        case BlogManagersVisibilityLevel.PUBLIC:
            return true;
        case BlogManagersVisibilityLevel.REGISTERED_USERS:
            return !!currentUser;
        case BlogManagersVisibilityLevel.SUBSCRIBERS:
            return currentUser && blog && blog.currentUserSubscribed;
        case BlogManagersVisibilityLevel.MANAGERS:
            return currentUser && currentUser.managedBlogs.map(blog => blog.blogId).includes(blog.id);
        case BlogManagersVisibilityLevel.OWNER:
            return currentUser && currentUser.ownedBlogs.includes(blog.id);
    }
};

export const canEditBlog = (currentUser, blog) => {
    return currentUser && currentUser.id === blog.owner.id;
};
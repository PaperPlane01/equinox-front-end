export const canSeeBlogPostReports = currentUser => {
    return currentUser && currentUser.authorities.map(authority => authority.name).includes('ROLE_ADMIN');
};
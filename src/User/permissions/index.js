export const canBlockUser = (user, currentUser) => {
    if (!currentUser || !user) {
        return false;
    }

    if (user.id === currentUser.id) {
        return false;
    }

    const userAuthorities = user.authorities.map(authority => authority.name);
    const currentUserAuthorities = user.authorities.map(authority => authority.name);

    if (userAuthorities.includes('ROLE_SUPER_ADMIN')) {
        return false;
    }

    if (userAuthorities.includes('ROLE_ADMIN') && !currentUserAuthorities.includes('ROLE_SUPER_ADMIN')) {
        return false;
    }

    return currentUserAuthorities.includes('ROLE_ADMIN');
};
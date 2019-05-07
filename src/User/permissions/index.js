export const canBlockUser = currentUser => {
    return currentUser && (currentUser.authorities.map(authority => authority.name).includes('ROLE_ADMIN')
        || currentUser.authorities.map(authority => authority.name).includes('ROLE_SUPER_ADMIN'));
};

export const canEditProfile = (currentUser, profileId) => {
    return currentUser && (currentUser.id === profileId);
};
export const canBlockUser = currentUser => {
    return currentUser && (currentUser.authorities.map(authority => authority.name).includes('ROLE_ADMIN')
        || currentUser.authorities.map(authority => authority.name).includes('ROLE_SUPER_ADMIN'));
};

export const canUpdateGlobalBlocking = currentUser => {
    return canBlockUser(currentUser);
};

export const canUnblockUser = currentUser => {
    return canBlockUser(currentUser);
};

export const canSeeGlobalBlockings = currentUser => {
    return canBlockUser(currentUser);
};
import queryString from 'query-string';
import Api from '../api';
import Routes from '../Routes';

const save = globalBlocking => {
    return Api.post(`/${Routes.GLOBAL_BLOCKINGS}`, JSON.stringify(globalBlocking));
};

const update = (id, globalBlocking) => {
    return Api.put(`/${Routes.GLOBAL_BLOCKINGS}/${id}`, JSON.stringify({...globalBlocking}));
};

const _delete = id => {
    return Api.delete(`/${Routes.GLOBAL_BLOCKINGS}/${id}`);
};

const findNotEndedByBlockedUser = blockedUserId => {
    return Api.get(`/${Routes.USERS}/${blockedUserId}/${Routes.GLOBAL_BLOCKINGS}/${Routes.NOT_ENDED}`);
};

const findAllByBlockedUser = (blockedUserId, paginationParameters) => {
    return Api.get(
        `/${Routes.USERS}/${blockedUserId}/${Routes.GLOBAL_BLOCKINGS}${paginationParameters && `?${queryString.stringify(paginationParameters)}`}`
    );
};

const findNotEndedAndCreatedByUser = userId => {
    return Api.get(`/${Routes.USERS}/${userId}/${Routes.GLOBAL_BLOCKINGS}/${Routes.CREATED}/${Routes.NOT_ENDED}`);
};

const findAllCreatedByUser = (userId, paginationParameters) => {
    return Api.get(`/${Routes.USERS}/${userId}/${Routes.GLOBAL_BLOCKINGS}/${Routes.CREATED}${paginationParameters && `?${queryString.stringify(paginationParameters)}`}`);
};

const findById = id => {
    return Api.get(`/${Routes.GLOBAL_BLOCKINGS}/${id}`);
};

const findByBlockedUserUsernameContains = (username, notEndedOnly = false, paginationParameters) => {
    return Api.get(`/${Routes.GLOBAL_BLOCKINGS}?${queryString.stringify({username, notEndedOnly, ...paginationParameters})}`);
};

const findAll = (notEndedOnly = false, paginationParameters) => {
    return Api.get(`/${Routes.GLOBAL_BLOCKINGS}?${queryString.stringify({notEndedOnly, ...paginationParameters})}`);
};

const saveMultiple = globalBlockings => {
    return Api.post(`/${Routes.GLOBAL_BLOCKINGS}/${Routes.MULTIPLE}`, JSON.stringify(globalBlockings));
};

export default {
    save,
    update,
    delete: _delete,
    findAllByBlockedUser,
    findNotEndedByBlockedUser,
    findAllCreatedByUser,
    findNotEndedAndCreatedByUser,
    findByBlockedUserUsernameContains,
    findAll,
    findById,
    saveMultiple
}
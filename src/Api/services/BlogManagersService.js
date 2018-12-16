import queryString from 'query-string';
import Api from '../Api';
import Routes from '../Routes';

const save = (blogId, userId, blogRole) => {
    return Api.post(`/${Routes.BLOGS}/${blogId}/${Routes.MANAGERS}`, JSON.stringify({userId, blogRole}));
};

const _delete = (blogId, managerId) => {
    return Api.delete(`/${Routes.BLOGS}/${blogId}/${Routes.MANAGERS}/${managerId}`);
};

const update = (blogId, managerId, blogRole) => {
    return Api.patch(`/${Routes.BLOGS}/${blogId}/${Routes.MANAGERS}/${managerId}`, JSON.stringify({blogRole}));
};

const findByBlog = (blogId, paginationParams) => {
    return Api.get(`/${Routes.BLOGS}/${blogId}/${Routes.MANAGERS}?${queryString.stringify(paginationParams)}`);
};

const findByBlogAndUsername = (blogId, username, paginationParams) => {
    let requestParams = {
        username
    };

    if (paginationParams) {
        requestParams = {
            ...requestParams,
            ...paginationParams
        };
    }

    return Api.get(`/${Routes.BLOGS}/${blogId}/${Routes.MANAGERS}?${queryString.stringify(requestParams)}`);
};

const findByBlogAndId = (blogId, id) => {
    return Api.get(`/${Routes.BLOGS}/${blogId}/${Routes.MANAGERS}/${id}`);
};

export default {
    save,
    delete: _delete,
    update,
    findByBlog,
    findByBlogAndUsername,
    findByBlogAndId
};
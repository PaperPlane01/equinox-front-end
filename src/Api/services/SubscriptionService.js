import queryString from 'query-string';
import Api from '../api';
import Routes from '../Routes';

const save = subscription => {
    return Api.post(`/${Routes.SUBSCRIPTIONS}`, JSON.stringify(subscription));
};

const _delete = id => {
    return Api.delete(`/${Routes.SUBSCRIPTIONS}/${id}`);
};

const findByBlog = (blogId, paginationParams) => {
    return Api.get(`/${Routes.BLOGS}/${blogId}/${Routes.SUBSCRIPTIONS}${paginationParams && `?${queryString.stringify(paginationParams)}`}`);
};

const isUserSubscribedToBlog = (userId, blogId) => {
    return Api.get(`/${Routes.SUBSCRIPTIONS}?${queryString.stringify({userId, blogId})}`);
};

const findSubscriptionsOfCurrentUser = paginationParams => {
    return Api.get(`/${Routes.CURRENT_USER}/${Routes.SUBSCRIPTIONS}${paginationParams && `?$${queryString.stringify(paginationParams)}`}`);
};

const findByBlogAndUsername = (blogId, username, paginationParams) => {
    let requestParameters = {username};
    if (paginationParams) {
        requestParameters = {
            ...requestParameters,
            ...paginationParams
        };
    }

    return Api.get(`/${Routes.BLOGS}/${blogId}/${Routes.SUBSCRIPTIONS}?${queryString.stringify(requestParameters)}`);
};

export default {
    save,
    delete: _delete,
    findByBlog,
    isUserSubscribedToBlog,
    findSubscriptionsOfCurrentUser,
    findByBlogAndUsername
};
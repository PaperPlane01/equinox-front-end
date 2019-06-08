import queryString from 'query-string';
import Api from '../api';
import Routes from '../Routes';

const save = blogPostLike => {
    return Api.post(`/${Routes.BLOG_POST_LIKES}`, JSON.stringify(blogPostLike));
};

const _delete = id => {
    return Api.delete(`/${Routes.BLOG_POST_LIKES}/${id}`);
};

const findByUser = (userId, paginationParameters) => {
    const paginationParametersQueryString = paginationParameters
        ? `?${queryString.stringify(paginationParameters)}`
        : '';
    return Api.get(`/${Routes.USERS}/${userId}/${Routes.BLOG_POST_LIKES}${paginationParametersQueryString}`);
};

export default {
    save,
    delete: _delete,
    findByUser
};
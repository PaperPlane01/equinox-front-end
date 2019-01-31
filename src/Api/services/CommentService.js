import queryString from 'query-string';
import Api from '../api';
import Routes from '../Routes';

const findByBlogPost = (blogPostId, paginationParams) => {
    return Api.get(`/${Routes.BLOG_POSTS}/${blogPostId}/${Routes.COMMENTS}${paginationParams && `?${queryString.stringify(paginationParams)}`}`);
};

const save = comment => {
    return Api.post(`/${Routes.COMMENTS}`, JSON.stringify(comment));
};

const update = (id, comment) => {
    return Api.put(`/${Routes.COMMENTS}/${id}`, JSON.stringify(comment));
};

const _delete = id => {
    return Api.delete(`/${Routes.COMMENTS}/${id}`)
};

const restore = id => {
    return Api.patch(`/${Routes.COMMENTS}/${id}`, JSON.stringify({deleted: false}));
};

const getThread = rootCommentId => {
    return Api.get(`/${Routes.COMMENTS}/${rootCommentId}/${Routes.THREAD}`);
};

const findById = id => {
    return Api.get(`/${Routes.COMMENTS}/${id}`);
};

export default {
    findByBlogPost,
    save,
    update,
    delete: _delete,
    restore,
    getThread,
    findById
};
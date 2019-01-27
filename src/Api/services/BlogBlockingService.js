import queryString from 'query-string';
import Api from '../api';
import Routes from '../Routes';

const save = blogBlocking => {
    return Api.post(`/${Routes.BLOG_BLOCKINGS}`, JSON.stringify(blogBlocking));
};

const update = (id, blogBlocking) => {
    return Api.put(`/${Routes.BLOG_BLOCKINGS}/${id}`, JSON.stringify(blogBlocking));
};

const _delete = id => {
    return Api.delete(`/${Routes.BLOG_BLOCKINGS}/${id}`);
};

const findNotEndedByBlog = (blogId, paginationParameters) => {
    return Api.get(`/${Routes.BLOGS}/${blogId}/${Routes.BLOCKINGS}/${Routes.NOT_ENDED}${paginationParameters && `?${queryString.stringify(paginationParameters)}`}`);
};

const findNotEndedByBlogAndBlockedUserUsername = (blogId, username, paginationParameters) => {
    return Api.get(`/${Routes.BLOGS}/${blogId}/${Routes.BLOCKINGS}/${Routes.NOT_ENDED}?blockedUserDisplayedUsername=${username}${paginationParameters && `&${queryString.stringify(paginationParameters)}`}`)
};

const findById = id => {
    return Api.get(`/${Routes.BLOG_BLOCKINGS}/${id}`);
};

export default {
    save,
    update,
    delete: _delete,
    findNotEndedByBlog,
    findNotEndedByBlogAndBlockedUserUsername,
    findById
}

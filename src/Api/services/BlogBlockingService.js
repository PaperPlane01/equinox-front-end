import queryString from 'query-string';
import Api from '../Api';
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
    return Api.get(`/${Routes.BLOGS}/${blogId}/${Routes.BLOG_BLOCKINGS}/${Routes.NOT_ENDED}${paginationParameters && `?${queryString.stringify(paginationParameters)}`}`);
};

const findNotEndedByBlogAndBlockedUserUsername = (blogId, username, paginationParameters) => {
    return Api.get(`/${Routes.BLOGS}/${blogId}/${Routes.BLOG_BLOCKINGS}/${Routes.NOT_ENDED}?blockedUserDisplayedUsername=${username}${paginationParameters && `&${queryString.stringify(paginationParameters)}`}`)
};

export default {
    save,
    update,
    delete: _delete,
    findNotEndedByBlog,
    findNotEndedByBlogAndBlockedUserUsername
}

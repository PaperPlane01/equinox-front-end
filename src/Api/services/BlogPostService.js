import queryString from 'query-string';
import Api from '../Api';
import Routes from '../Routes';

const save = blogPost => {
    return Api.post(`/${Routes.BLOG_POSTS}`, JSON.stringify(blogPost));
};

const update = (id, blogPost) => {
    return Api.put(`/${Routes.BLOG_POSTS}/${id}`, JSON.stringify(blogPost));
};

const _delete = id => {
    return Api.delete(`/${Routes.BLOG_POSTS}/${id}`)
};

const findById = id => {
    return Api.get(`/${Routes.BLOG_POSTS}/${id}`);
};

const findByBlog = (blogId, paginationParameters) => {
    return Api.get(`/${Routes.BLOGS}/${blogId}/${Routes.BLOG_POSTS}${paginationParameters && `?${queryString.stringify(paginationParameters)}`}`);
};

const getAuhtorOfBlogPost = blogPostId => {
    return Api.get(`/${Routes.BLOG_POSTS}/${blogPostId}/${Routes.AUTHOR}`);
};

export default {
    save,
    update,
    delete: _delete,
    findById,
    findByBlog,
    getAuhtorOfBlogPost
};
import queryString from 'query-string';
import Api from '../api';
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

const getAuthorOfBlogPost = blogPostId => {
    return Api.get(`/${Routes.BLOG_POSTS}/${blogPostId}/${Routes.AUTHOR}`);
};

const getFeed = paginationParameters => {
    return Api.get(`/${Routes.BLOG_POSTS}/${Routes.FEED}${paginationParameters && `?${queryString.stringify(paginationParameters)}`}`);
};

const getMostPopularForMonth = paginationParameters => {
    return Api.get(`/${Routes.BLOG_POSTS}/${Routes.MOST_POPULAR}/${Routes.FOR_MONTH}${paginationParameters && `?${queryString.stringify(paginationParameters)}`}`);
};

const getMostPopularForWeek = paginationParameters => {
    return Api.get(`/${Routes.BLOG_POSTS}/${Routes.MOST_POPULAR}/${Routes.FOR_WEEK}${paginationParameters && `?${queryString.stringify(paginationParameters)}`}`);
};

const getMostPopularForYear = paginationParameters => {
    return Api.get(`/${Routes.BLOG_POSTS}/${Routes.MOST_POPULAR}/${Routes.FOR_YEAR}${paginationParameters &&`?${queryString.stringify(paginationParameters)}`}`)
};

const pin = id => {
    return Api.post(`/${Routes.BLOG_POSTS}/${id}/${Routes.PIN}`);
};

const unpin = id => {
    return Api.delete(`/${Routes.BLOG_POSTS}/${id}/${Routes.UNPIN}`);
};

const findPinnedByBlog = blogId => {
    return Api.get(`/${Routes.BLOGS}/${blogId}/${Routes.BLOG_POSTS}/${Routes.PINNED}`);
};

const search = (query, paginationParameters) => {
    let queryParameters = {query};
    if (paginationParameters) {
        queryParameters = {
            ...queryParameters,
            ...paginationParameters
        }
    }
    const _queryString = queryString.stringify(queryParameters);
    return Api.get(`/${Routes.BLOG_POSTS}/${Routes.SEARCH}?${_queryString}`);
};

export default {
    save,
    update,
    delete: _delete,
    findById,
    findByBlog,
    getAuthorOfBlogPost,
    getFeed,
    getMostPopularForWeek,
    getMostPopularForMonth,
    getMostPopularForYear,
    pin,
    unpin,
    findPinnedByBlog,
    search
};
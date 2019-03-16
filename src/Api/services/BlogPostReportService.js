import queryString from 'query-string';
import Api from '../api';
import Routes from '../Routes';

const save = blogPostReport => {
    return Api.post(`/${Routes.BLOG_POST_REPORTS}`, JSON.stringify(blogPostReport));
};

const update = (id, blogPostReport) => {
    return Api.put(`/${Routes.BLOG_POST_REPORTS}/${id}`, JSON.stringify(blogPostReport));
};

const _delete = id => {
    return Api.delete(`/${Routes.BLOG_POST_REPORTS}/${id}`);
};

const findAll = paginationParameters => {
    return Api.get(`/${Routes.BLOG_POST_REPORTS}${paginationParameters && `?${queryString.stringify(paginationParameters)}`}`)
};

const updateMultiple = blogPostReports => {
    return Api.put(`/${Routes.BLOG_POST_REPORTS}/${Routes.MULTIPLE}`, JSON.stringify(blogPostReports));
};

export default {
    save,
    update,
    delete: _delete,
    findAll,
    updateMultiple
};
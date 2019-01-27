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

export default {
    save,
    update,
    delete: _delete
};
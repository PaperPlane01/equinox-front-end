import Api from '../api';
import Routes from '../Routes';

const save = blogPostLike => {
    return Api.post(`/${Routes.BLOG_POST_LIKES}`, JSON.stringify(blogPostLike));
};

const _delete = id => {
    return Api.delete(`/${Routes.BLOG_POST_LIKES}/${id}`);
};

export default {
    save,
    delete: _delete
};
import Api from '../Api';
import Routes from '../Routes';

const save = blog => {
    return Api.post(`/${Routes.BLOGS}`, JSON.stringify(blog));
};

const update = (id, blog) => {
    return Api.put(`/${Routes.BLOGS}/${id}`, JSON.stringify(blog));
};

const _delete = id => {
    return Api.delete(`/${Routes.BLOGS}/${id}`);
};

const findById = id => {
    return Api.get(`/${Routes.BLOGS}/${id}`);
};

const findMinifiedById = id => {
    return Api.get(`/${Routes.BLOGS}/${id}/${Routes.MINIFIED}`);
};

export default {
    save,
    update,
    delete: _delete,
    findById
};
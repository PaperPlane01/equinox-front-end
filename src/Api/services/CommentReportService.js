import Api from '../Api';
import Routes from '../Routes';

const save = commentReport => {
    return Api.post(`/${Routes.COMMENT_REPORTS}`, JSON.stringify(commentReport));
};

const update = (id, commentReport) => {
    return Api.put(`/${Routes.COMMENT_REPORTS}/${id}`, JSON.stringify(commentReport));
};

const _delete = id => {
    return Api.delete(`/${Routes.COMMENT_REPORTS}/${id}`);
};

export default {
    save,
    update,
    delete: _delete
};
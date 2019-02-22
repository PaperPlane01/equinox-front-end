import queryString from 'query-string';
import Api from '../api';
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

const findAll = paginationParameters => {
    return Api.get(`/${Routes.COMMENT_REPORTS}${paginationParameters && `?${queryString.stringify(paginationParameters)}`}`);
};

const updateMultiple = commentReports => {
    return Api.put(`/${Routes.COMMENT_REPORTS}/${Routes.MULTIPLE}`, JSON.stringify(commentReports));
};

export default {
    save,
    update,
    delete: _delete,
    findAll,
    updateMultiple
};
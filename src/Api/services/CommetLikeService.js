import Api from '../Api';
import Routes from '../Routes';

const save = commentLike => {
    return Api.post(`/${Routes.COMMENT_LIKES}`, JSON.stringify(commentLike));
};

const _delete = commentLikeId => {
    return Api.delete(`/${Routes.COMMENT_LIKES}/${commentLikeId}`);
};

export default {
    save,
    delete: _delete
};
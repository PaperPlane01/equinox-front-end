import queryString from 'query-string';
import Api from '../api';
import Routes from '../Routes';

const findAll = paginationParams => {
    return Api.get(`/${Routes.NOTIFICATIONS}${paginationParams && `?${queryString.stringify(paginationParams)}`}`)
};

const markAsRead = notificationIds => {
    return Api.patch(`/${Routes.NOTIFICATIONS}/${Routes.MARK_READ}`, JSON.stringify(notificationIds));
};

const markAsUnread = notificationIds => {
    return Api.patch(`/${Routes.NOTIFICATIONS}/${Routes.MARK_UNREAD}`, JSON.stringify(notificationIds));
};

const update = (id, notification) => {
    return Api.put(`/${Routes.NOTIFICATIONS}/${id}`, JSON.stringify(notification));
};

const _delete = id => {
    return Api.delete(`/${Routes.NOTIFICATIONS}/${id}`);
};

export default {
    findAll,
    markAsRead,
    markAsUnread,
    update,
    delete: _delete
};
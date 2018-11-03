import _ from 'lodash';
import {observable, action, reaction, computed} from 'mobx';
import {notificationService, createErrorFromResponse} from "../../Api";

export default class NotificationsHolderStore {
    @observable notifications = [];
    @observable pending = false;
    @observable error = undefined;
    @observable currentPage = 0;
    @observable notificationsHolderOpened = false;
    @observable authStore = undefined;
    @observable scheduledTimer = undefined;

    @computed get unreadNotifications() {
        return this.notifications.filter(notification => !notification.read);
    }

    @computed get readNotifications() {
        return this.notifications.filter(notification => notification.read);
    }

    constructor(authStore) {
        this.authStore = authStore;

        reaction(
            () => authStore.currentUser,
            currentUser => {
                if (this.scheduledTimer) {
                    clearInterval(this.scheduledTimer);
                }
                this.notifications = [];
                if (currentUser) {
                    this.fetchNewNotifications();
                    this.scheduledTimer = setInterval(this.fetchNewNotifications, 10000);
                }
            }
        )
    }

    @action fetchNotifications = () => {
        this.pending = true;
        this.error = undefined;

        return notificationService.findAll({
            page: this.currentPage,
            pageSize: 30,
            sortBy: 'id',
            sortingDirection: 'desc'
        }).then(response => {
            if (response.data.length !== 0) {
                this.notifications = [
                    ...this.notifications,
                    ...response.data
                ];
                this.currentPage = this.currentPage + 1;
            }
        }).catch(error => {
            this.error = createErrorFromResponse(error.response);
        }).then(() => {
            this.pending = false;
        })
    };

    @action fetchNewNotifications = () => {
        this.pending = true;
        this.error = undefined;

        return notificationService.findAll({
            page: 0,
            pageSize: 30,
            sortBy: 'id',
            sortingDirection: 'desc'
        }).then(response => {
            this.notifications.unshift(response.data);
            this.notifications = _.uniq(...this.notifications);
        }).catch(error => {
            this.error = createErrorFromResponse(error.response);
        }).then(() => {
            this.pending = false;
        })
    };

    @action markNotificationsAsRead = () => {
        const chunks = _.chunk(this.unreadNotifications, 30);

        chunks.forEach(chunk => {
            const ids = chunk.map(notification => notification.id);
            notificationService.markAsRead(ids);
        })
    }
}
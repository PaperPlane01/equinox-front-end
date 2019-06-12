import _ from 'lodash';
import {observable, action, reaction, computed} from 'mobx';
import localStorage from 'mobx-localstorage';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {notificationService, createErrorFromResponse, Routes} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'authStore'},
        {propertyName: 'settingsStore'}
    ]
})
class NotificationsHolderStore {
    @observable authStore = undefined;
    @observable settingsStore = undefined;
    @observable notifications = [];
    @observable pending = false;
    @observable error = undefined;
    @observable currentPage = 0;
    @observable notificationsHolderOpened = false;
    @observable scheduledTimer = undefined;
    @observable socketClient = undefined;

    @computed get currentUser() {
        return this.authStore.currentUser;
    }

    @computed get useWebSocket() {
        return this.settingsStore.useWebSocketForNotifications;
    }

    @computed get unreadNotifications() {
        return this.notifications.filter(notification => !notification.read);
    }

    @computed get readNotifications() {
        return this.notifications.filter(notification => notification.read);
    }

    constructor() {
        reaction(
            () => this.currentUser,
            currentUser => {
                if (this.scheduledTimer) {
                    clearInterval(this.scheduledTimer);
                }
                this.notifications = [];
                if (currentUser) {
                    console.log(this.useWebSocket);
                    if (this.useWebSocket) {
                        this.fetchNotifications();
                        this.initWebSocket();
                        this.subscribeToNotifications();
                    } else {
                        this.fetchNotifications();
                        this.scheduledTimer = setInterval(this.fetchNotifications, 30000);
                    }
                } else {
                    this.closeWebSocket();
                }
            }
        );

        reaction(
            () => this.useWebSocket,
            useWebSocket => {
                if (this.currentUser) {
                    if (useWebSocket) {
                        this.initWebSocket();
                        this.subscribeToNotifications();
                    } else {
                        this.closeWebSocket();
                        this.fetchNotifications();
                        this.scheduledTimer = setInterval(this.fetchNotifications, 30000);
                    }
                }
            }
        )
    }

    @action initWebSocket = () => {
        const accessToken = localStorage.getItem('accessToken');
        const sockJsClient = new SockJS(`${Routes.WEB_SOCKET_API_ROOT}/${Routes.HANDSHAKE}?access_token=${accessToken}`);
        this.socketClient = Stomp.over(sockJsClient);
    };

    @action closeWebSocket = () => {
        this.socketClient.disconnect();
    };

    @action subscribeToNotifications = () => {
        this.socketClient.connect({}, () => {
            //fixme: sometimes it crashes with error 'Connection has not been established yet'
            this.socketClient.subscribe('/user/notifications', response => {
                const parsedNotifications = JSON.parse(response.body);
                this.insertNotifications(parsedNotifications);
            })
        })
    };

    @action insertNotifications = receivedNotifications => {
        this.notifications.map(notification => {
            receivedNotifications.forEach(receivedNotification => {
                if (notification.id === receivedNotification.id) {
                    notification = {...receivedNotification};
                }
            })
        });
        this.notifications.unshift(...receivedNotifications);
        this.notifications = _.uniqBy(this.notifications, "id");
    };

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
                this.insertNotifications(response.data);
                this.currentPage = this.currentPage + 1;
            }
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

export default NotificationsHolderStore;
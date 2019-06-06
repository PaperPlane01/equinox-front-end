import {observable, action, reaction, computed} from 'mobx';
import authStore from './AuthStore';
import currentUserSubscriptionsStore from '../../AppBar/stores/CurrentUserSubscriptionsStore';
import Api, {Routes, createErrorFromResponse} from "../../Api";

class UserProfileSubscriptionsStore {
    @observable subscriptions = [];

}
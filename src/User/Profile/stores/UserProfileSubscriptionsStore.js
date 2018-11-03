import {observable, action, reaction, computed} from 'mobx';
import authStore from '../../stores/AuthStore';
import currentUserSubscriptionsStore from '../../../AppBar/stores/CurrentUserSubscriptionsStore';
import Api, {Routes, createErrorFromResponse} from "../../../Api/index";

class UserProfileSubscriptionsStore {
    @observable subscriptions = [];

}
import {observable, action} from 'mobx';

export default class SettingsDialogStore {
    @observable open = false;

    @action setOpen = open => {
        this.open = open;
    }
}
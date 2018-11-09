import {observable, action} from 'mobx';
import localStorage from 'mobx-localstorage';

export default class SettingsStore {
    @observable settingsDialogOpened = false;
    @observable colorTheme = localStorage.getItem("colorTheme") || "pink";

    @action setSettingsDialogOpened = opened => {
        this.settingsDialogOpened = opened;
    };

    @action setColorTheme = colorTheme => {
        this.colorTheme = colorTheme;
        localStorage.setItem("colorTheme", colorTheme);
    }
}
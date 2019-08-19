import {observable, action, computed} from "mobx";
import localStorage from "mobx-localstorage";
import {en, ru} from "../translations";
import {Component} from "../simple-ioc";

@Component()
class LocaleStore {
    @observable
    currentLocale = localStorage.getItem('preferredLanguage') || 'ru';

    @observable
    translations = {
        en,
        ru
    };

    @computed
    get currentTranslations() {
        return this.translations[this.currentLocale];
    }

    @action
    setLocale = locale => {
        localStorage.setItem('preferredLanguage', locale);
        this.currentLocale = locale;
    }
}

export default LocaleStore;
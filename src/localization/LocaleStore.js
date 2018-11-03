import {observable, action, reaction} from 'mobx';
import localStorage from 'mobx-localstorage';

export default class LocaleStore {
    @observable currentLocale;
    @observable currentTranslations;
    @observable translations;

    constructor(currentLocale, translations) {
        this.currentLocale = currentLocale;
        this.currentTranslations = translations[currentLocale];

        reaction(
            () => this.currentLocale,
            (locale) => this.currentTranslations = translations[locale]
        )
    }

    @action setLocale = locale => {
        localStorage.setItem('preferredLanguage', locale);
        this.currentLocale = locale;
    }
}
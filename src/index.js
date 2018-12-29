import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {RouterStore, startRouter} from 'mobx-router';
import localStorage from 'mobx-localstorage';
import views from './router-config';
import {en, ru} from './translations';
import {LocaleStore} from './localization';
import appStore from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

appStore.localeStore = new LocaleStore(localStorage.getItem("preferredLanguage") || "ru", {"en": en, "ru": ru});

const routerStore = {
    router: new RouterStore()
};

startRouter(views, routerStore, {
    notfound: () => {
        routerStore.router.goTo(views.notFound);
    }
});

ReactDOM.render(<Provider store={routerStore} {...appStore}>
    <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {RouterStore, startRouter} from 'mobx-router';
import localStorage from 'mobx-localstorage';
import {SnackbarProvider} from 'notistack';
import views from './router-config';
import {en, ru} from './translations';
import {LocaleStore} from './localization';
import appStore from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {WEB_APP_BASE_URL} from "./Api/Routes";

appStore.localeStore = new LocaleStore(localStorage.getItem("preferredLanguage") || "ru", {"en": en, "ru": ru});

const routerStore = {
    router: new RouterStore()
};

startRouter(views, routerStore, {
    notfound: () => {
        if (!window && window.location.href.includes(`${WEB_APP_BASE_URL}/auth/google/`)) {
            routerStore.router.goTo(views.notFound);
        }
    }
});

ReactDOM.render(<Provider store={routerStore} {...appStore}>
    <SnackbarProvider maxSnack={3}>
        <App/>
    </SnackbarProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();

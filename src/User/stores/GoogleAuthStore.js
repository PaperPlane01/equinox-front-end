import {observable, action, computed, reaction} from 'mobx';
import localStorage from 'mobx-localstorage';
import {userService, createErrorFromResponse} from "../../Api";
import addSeconds from "date-fns/addSeconds";
import {getUTCDate} from "../../utils";

export default class GoogleAuthStore {
    @observable googleToken = undefined;
    @observable authStore = undefined;
    @observable pending = false;
    @observable error = undefined;

    @computed get originalPath() {
        return localStorage.getItem('originalPath');
    };

    @computed get originalParams() {
        return JSON.parse(localStorage.getItem('originalParams'));
    };

    @computed get originalQueryParams() {
        return JSON.parse(localStorage.getItem('originalQueryParams'));
    };

    constructor(authStore) {
        this.authStore = authStore;

        reaction(
            () => this.googleToken,
            () => this.loginWithGoogle()
        )
    }

    @action setGoogleToken = token => {
        this.googleToken = token;
    };

    @action setOriginalPath = path => {
        localStorage.setItem('originalPath', path);
    };

    @action setOriginalParams = params => {
        localStorage.setItem('originalParams', JSON.stringify(params));
    };

    @action setOriginalQueryParams = queryParams => {
        localStorage.setItem('originalQueryParams', JSON.stringify(queryParams));
    };

    @action loginWithGoogle = () => {
        this.error = undefined;
        this.pending = true;

        return userService.doLoginWithGoogle(this.googleToken)
            .then(response => {
                const currentDate = new Date();
                const expirationDate = addSeconds(currentDate, response.data.expires_in);
                localStorage.setItem('accessTokenExpirationDate', getUTCDate(expirationDate));
                localStorage.setItem('accessToken', response.data.access_token);
                localStorage.setItem('refreshToken', response.data.refresh_token);
            }).catch(error => {
                this.error = createErrorFromResponse(error.response);
            }).then(() => {
                this.pending = false;
            })
    }
}
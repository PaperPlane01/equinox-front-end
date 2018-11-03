import {action, computed, observable, reaction} from 'mobx';
import localStorage from 'mobx-localstorage';
import {createErrorFromResponse, userService} from "../../Api";
import {validateLoginPassword, validateLoginUsername} from "../validation";

export default class AuthStore {
    @observable pending = false;
    @observable loginFormValues = {
        username: '',
        password: ''
    };
    @observable loginFormErrors = {
        username: undefined,
        password: undefined
    };
    @observable loginError = undefined;
    @observable currentUser = undefined;
    @observable previousUser = undefined;
    @observable loginDialogOpen = false;
    @observable loginSuccess = false;

    constructor() {
        reaction(
            () => this.loginFormValues.username,
            () => this.validateUsername()
        );

        reaction(
            () => this.loginFormValues.password,
            () => this.validatePassword()
        );

        reaction(
            () => this.accessToken,
            (accessToken) => {
                if (accessToken) {
                    this.loginDialogOpen = false;
                    if (!this.currentUser) {
                        this.fetchCurrentUser();
                    }
                }
            }
        );
    }

    @computed get accessToken() {
        return localStorage.getItem('accessToken');
    }

    @computed get refreshToken() {
        return localStorage.getItem('refreshToken');
    }

    @computed get loggedIn() {
        return Boolean(this.accessToken);
    }

    @action setLoginFormValue = (value, propertyName) => {
        this.loginFormValues[propertyName] = value;
    };

    @action validatePassword = () => {
        this.loginFormErrors.password = validateLoginPassword(this.loginFormValues.password);
    };

    @action validateUsername = () => {
        this.loginFormErrors.username = validateLoginUsername(this.loginFormValues.username);
    };

    @action validateForm = () => {
        this.validateUsername();
        this.validatePassword();
    };

    @action doLogin = () => {
        this.validateForm();
        const {username, password} = this.loginFormErrors;

        if (username || password) {
            return;
        }

        this.pending = true;
        this.loginError = undefined;

        return userService.doLogin(
            this.loginFormValues.username, this.loginFormValues.password
        ).then(response => {
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            this.loginError = undefined;
            this.loginSuccess = true;
        }).catch(error => {
            this.loginError = createErrorFromResponse(error.response);
            this.loginSuccess = false;
        }).then(() => {
            this.pending = false;
        })
    };

    @action fetchCurrentUser = () => {
        return userService.getCurrentUser()
            .then(response => {
                this.currentUser = response.data;
            }).catch(() => {
                console.log('failed to load current user');
            })
    };

    @action doLogOut = () => {
        return userService.doLogOut(this.accessToken, this.refreshToken)
            .then(() => {
                this.previousUser = {
                    ...this.currentUser
                };
                this.currentUser = undefined;
                localStorage.delete('accessToken');
                localStorage.delete('refreshToken');
            }).catch(() => {
                console.log('failed to revoke token');
                this.currentUser = undefined;
                localStorage.delete('accessToken');
                localStorage.delete('refreshToken');
            }).then(() => {
                this.loginSuccess = false;
            })
    };

    @action setLoginDialogOpen = open => {
        this.loginDialogOpen = open;
    }
}
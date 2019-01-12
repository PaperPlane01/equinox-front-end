import {observable, action, reaction, computed} from 'mobx';
import localStorage from 'mobx-localstorage';
import _ from 'lodash';
import {createErrorFromResponse, globalBlockingService} from "../../Api";
import {isBlank} from "../../utils";
import {canSeeGlobalBlockings} from "../permissions";

export default class GlobalBlockingsStore {
    @observable globalBlockings = [];
    @observable paginationParameters = {
        pageSize: 20,
        sortingDirection: 'desc',
        sortBy: 'startDate'
    };
    @observable currentPage = 0;
    @observable username = "";
    @observable includeNotEndedOnly = localStorage.getItem('includeNotEndedGlobalBlockingsOnly') === undefined
        ? true
        : localStorage.getItem('includeNotEndedGlobalBlockingsOnly');
    @observable pending = false;
    @observable error = undefined;
    @observable authStore = undefined;
    @observable deleteGlobalBlockingStore = undefined;
    @observable updateGlobalBlockingStore = undefined;
    @observable shouldReloadGlobalBlockingsOnCurrentUserChange = false;

    @computed get currentUser() {
        return this.authStore.currentUser;
    }

    constructor(authStore, deleteGlobalBlockingStore, updateGlobalBlockingStore) {
        this.authStore = authStore;
        this.deleteGlobalBlockingStore = deleteGlobalBlockingStore;
        this.updateGlobalBlockingStore = updateGlobalBlockingStore;
        console.log(localStorage.getItem('includeNotEndedGlobalBlockingsOnly'));

        reaction(
            () => this.username,
            () => {
                this.globalBlockings = [];
                this.currentPage = 0;
                const _fetchGlobalBlockings = _.debounce(this.fetchGlobalBlockings, 300);
                _fetchGlobalBlockings();
            }
        );

        reaction(
            () => this.includeNotEndedOnly,
            () => {
                this.globalBlockings = [];
                this.currentPage = 0;
                this.fetchGlobalBlockings();
            }
        );

        reaction(
            () => this.currentUser,
            () => {
                if (this.shouldReloadGlobalBlockingsOnCurrentUserChange) {
                    this.globalBlockings = [];
                    this.currentPage = 0;
                    this.fetchGlobalBlockings();
                }
            }
        );

        reaction(
            () => this.deleteGlobalBlockingStore.deleteSuccess,
            success => {
                if (success && this.deleteGlobalBlockingStore.globalBlockingId) {
                    this.globalBlockings = this.globalBlockings
                        .filter(globalBlocking => globalBlocking.id !== this.deleteGlobalBlockingStore.globalBlockingId);
                }
            }
        );

        reaction(
            () => this.updateGlobalBlockingStore.persistedGlobalBlocking,
            persistedGlobalBlocking => {
                this.globalBlockings.map(globalBlocking => {
                    if (globalBlocking.id === persistedGlobalBlocking.id) {
                        return persistedGlobalBlocking;
                    } else {
                        return globalBlocking;
                    }
                })
            }
        )
    };

    @action setUsername = username => {
        this.username = username;
    };

    @action setShouldReloadGlobalBlockingsOnCurrentUserChange = shouldReloadGlobalBlockingsOnCurrentUserChange => {
        this.shouldReloadGlobalBlockingsOnCurrentUserChange = shouldReloadGlobalBlockingsOnCurrentUserChange;
    };

    @action setIncludeNotEndedOnly = includeNotEndedOnly => {
        localStorage.setItem('includeNotEndedGlobalBlockingsOnly', includeNotEndedOnly);
        this.includeNotEndedOnly = includeNotEndedOnly;
    };

    @action reset = () => {
        this.globalBlockings = [];
        this.currentPage = 0;
    };

    @action fetchGlobalBlockings = () => {
        if (canSeeGlobalBlockings(this.currentUser)) {
            this.pending = true;
            this.error = undefined;

            if (isBlank(this.username)) {
                return globalBlockingService.findAll(this.includeNotEndedOnly, {
                    ...this.paginationParameters,
                    page: this.currentPage
                }).then(response => {
                    this.handleSuccess(response);
                }).catch(error => {
                    this.error = createErrorFromResponse(error.response);
                }).then(() => {
                    this.pending = false;
                })
            } else {
                return globalBlockingService.findByBlockedUserUsernameContains(this.username, this.includeNotEndedOnly, {
                    ...this.paginationParameters,
                    page: this.currentPage
                }).then(response => {
                    this.handleSuccess(response);
                }).catch(error => {
                    this.error = createErrorFromResponse(error.response);
                }).then(() => {
                    this.pending = false;
                })
            }
        }
    };

    handleSuccess = response => {
        if (response.data.length !== 0) {
            this.globalBlockings = [
                ...this.globalBlockings,
                ...response.data
            ];
            this.currentPage = this.currentPage + 1;
        }
    };
}
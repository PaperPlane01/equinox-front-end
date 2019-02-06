import axios from 'axios';
import localStorage from 'mobx-localstorage';
import queryString from 'query-string';
import Routes from './Routes';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(promise => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

const client = axios.create({
    baseURL: Routes.API_ROOT,
    headers: {
        'Content-type': 'application/json'
    }
});

client.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

client.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401
        && error.response.data && error.response.data.error === 'invalid_token') {
        if (localStorage.getItem('refreshToken')) {
            const originalRequest = error.config;
            if (!originalRequest._retry) {
                originalRequest._retry = true;
            }
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject})
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return client(originalRequest);
                }).catch(error => {
                    return error
                })
            }
            return refreshAccessToken(originalRequest);
        }
    } else {
        throw error;
    }
});

export const refreshAccessToken = originalRequest => {
    return new Promise((resolve, reject) => {
        client({
            method: 'POST',
            baseURL: Routes.API_BASE_URL,
            url: `/${Routes.OAUTH}/${Routes.TOKEN}?${queryString.stringify({
                grant_type: 'refresh_token',
                refresh_token: localStorage.getItem('refreshToken'),
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET
            })}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            if (originalRequest) {
                originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
                processQueue(null, response.data.token);
                resolve(client(originalRequest));
            }
        }).catch(error => {
            console.log('failed to refresh token');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            processQueue(error, null);
            reject(error);
        }).then(() => {
            isRefreshing = false;
        })
    })
};

export default client;
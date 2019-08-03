import queryString from 'query-string';
import Api from '../api';
import Routes from '../Routes';

const save = (user, authType) => {
    return Api.post(`/${Routes.USERS}?${queryString.stringify({authType})}`, JSON.stringify(user));
};

const updateCurrentUser = user => {
    return Api.put(`/${Routes.CURRENT_USER}`, JSON.stringify(user))
};

const _delete = id => {
    return Api.delete(`/${Routes.USERS}/${id}`);
};

const findById = id => {
    return Api.get(`/${Routes.USERS}/${id}`);
};

const getCurrentUser = () => {
    return Api.get(`/${Routes.CURRENT_USER}`);
};

const getFullProfileOfCurrentUser = () => {
    return Api.get(`/${Routes.CURRENT_USER}/${Routes.FULL_PROFILE}`);
};

const checkUsernameAvailability = username => {
    return Api.get(`/${Routes.USERS}/${Routes.USERNAME}/${username}/${Routes.IS_AVAILABLE}`);
};

const checkEmailAvailability = email => {
    return Api.get(`/${Routes.USERS}/${Routes.EMAIL}/${email}/${Routes.IS_AVAILABLE}`);
};

const doLogin = (username, password) => {
    return Api({
        method: 'POST',
        baseURL: `${Routes.API_BASE_URL}`,
        url: `/${Routes.OAUTH}/${Routes.TOKEN}`,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'accept': 'application/json',
        },
        data: queryString.stringify({
            grant_type: 'password',
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            username: username,
            password: password
        })
    })
};

const doLoginWithGoogle = googleToken => {
    console.log(googleToken);
    return Api({
        method: 'POST',
        baseURL: `${Routes.API_BASE_URL}`,
        url: `/${Routes.OAUTH}/${Routes.GOOGLE}`,
        data: {
            clientId: process.env.REACT_APP_CLIENT_ID,
            clientSecret: process.env.REACT_APP_CLIENT_SECRET,
            googleToken
        }
    })
};

const doLogOut = (accessToken, refreshToken) => {
    return Api({
        method: 'DELETE',
        baseURL: `${Routes.API_BASE_URL}`,
        url: `/${Routes.OAUTH}/${Routes.REVOKE_TOKEN}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-type': 'application/json'
        },
        data: {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    })
};

export default {
    save,
    updateCurrentUser,
    delete: _delete,
    findById,
    getCurrentUser,
    getFullProfileOfCurrentUser,
    checkUsernameAvailability,
    doLogin,
    doLogOut,
    doLoginWithGoogle,
    checkEmailAvailability
};
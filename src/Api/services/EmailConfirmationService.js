import Api from "../api";
import Routes from "../Routes";

const confirmEmail = confirmationId => {
    return Api.post(`/${Routes.EMAIL_CONFIRMATIONS}/${confirmationId}`);
};

const requestConfirmationEmailForCurrentUser = (language = "en") => {
    return Api.get(`/${Routes.EMAIL_CONFIRMATIONS}?language=${language}`);
};

export default {
    confirmEmail,
    requestConfirmationEmailForCurrentUser
}
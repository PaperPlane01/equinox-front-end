import {isBlank, isEmail} from "../../utils";
import {isImage} from "../../utils/index";

export const validateLoginUsername = loginUsername => {
    if (isBlank(loginUsername)) {
        return "emptyUsername"
    }

    return undefined;
};

export const validateLoginPassword = password => {
    if (isBlank(password)) {
        return "emptyPassword";
    }

    return undefined;
};

export const validateLoginUsernameForSignUp = loginUsername => {
    if (!loginUsername || loginUsername.length === 0) {
        return "emptyUsername"
    }

    if (loginUsername.length < 3) {
        return "loginUsernameIsTooShort";
    }

    if (loginUsername.length > 25) {
        return "loginUsernameIsTooLong";
    }

    return undefined;
};

export const validatePassword = password => {
    if (isBlank(password)) {
        return "emptyPassword";
    }

    if (password.length < 3) {
        return "passwordIsTooShort";
    }

    if (password.length > 25) {
        return "passwordIsTooLong"
    }

    return undefined;
};

export const validateRepeatedPassword = (password, repeatedPassword) => {
    if (password !== repeatedPassword) {
        return "passwordsDoNotMatch";
    }

    return undefined;
};

export const validateDisplayedUsername = displayedUsername => {
    if (!displayedUsername) {
        return undefined;
    }

    if (displayedUsername.length > 50) {
        return "displayedUsernameIsTooLong";
    }

    return undefined;
};

export const validateBio = bio => {
    if (isBlank(bio)) {
        return undefined;
    }

    if (bio.length > 80) {
        return "bioIsTooLong";
    }

    return undefined;
};

export const validateEmail = (email, required = false) => {
    if (isBlank(email)) {
        return required ? "emailIsRequired" : undefined;
    }

    if (!isEmail(email)) {
        return "invalidEmail";
    }

    if (email.length > 70) {
        return "emailIsTooLong";
    }

    return undefined;
};

export const validateAvatarUri = avatarUri => {
    return new Promise(resolve => {
        if (isBlank(avatarUri)) {
            resolve(undefined);
        }

        isImage({url: avatarUri, timeout: 5000})
            .then(() => {
                resolve(undefined);
            }).catch(() => {
                resolve('invalidImageUrl');
            })
    })
};

export default {
    validateLoginUsername,
    validateLoginPassword,
    validatePassword,
    validateRepeatedPassword,
    validateLoginUsernameForSignUp,
    validateDisplayedUsername,
    validateBio,
    validateEmail,
    validateAvatarUri
}
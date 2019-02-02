import numeral from 'numeral';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VALID_NUMERICAL_ID_REGEX = /^[1-9][0-9]*/;

export const isBlank = string => {
    return !string || string.trim().length === 0;
};

export const isEmail = string => {
    return EMAIL_REGEX.test(string);
};

export const isValidNumericalId = candidate => {
    if (!candidate) return false;
    const string = "" + candidate;
    return VALID_NUMERICAL_ID_REGEX.test(string);
};

export const isImage = ({url, timeout = 5000}) => {
    const ERROR_MESSAGE_LOAD_FAILED = 'Failed to load image';
    const ERROR_MESSAGE_LOAD_TIMED_OUT = 'Failed to load image: time out reached.';

    return new Promise((resolve, reject) => {
        const image = new Image();
        let timedOut = false;

        const errorHandler = () => {
            if (timedOut) {
                return;
            }
            clearTimeout(timer);
            reject(new Error(ERROR_MESSAGE_LOAD_FAILED))
        };

        const timer = setTimeout(() => {
            timedOut = true;
            image.src = '//!!!/image.jpg';
            reject(new Error(ERROR_MESSAGE_LOAD_TIMED_OUT))
        }, timeout);

        image.onerror = image.onabort = errorHandler;

        image.onload = () => {
            if (timedOut) {
                return
            }
            clearTimeout(timer)
            resolve({ image, url })
        };
        image.src = url
    });
};

export const getUTCDate = date => {
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDay(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    )
};

export const prettifyNumber = number => {
    if (number < 1000) {
        return number;
    } else {
        return numeral(number).format('0.0a');
    }
};
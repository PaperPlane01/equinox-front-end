export default response => {
    const error = {
        status: undefined,
        exception: undefined,
        message: undefined
    };

    if (!response) {
        error.status = 500;
        error.exception = 'SERVER_ERROR';
    } else if (!response.data) {
        error.status = response.status;
    } else {
        error.status = response.status;
        error.exception = response.data.exception;
        error.message = response.data.message;
    }

    return error;
}
function throwError (errorMessage, statusCode) {
    const err = new Error(errorMessage);
    err.status = statusCode;
    throw err;
}

export default throwError;
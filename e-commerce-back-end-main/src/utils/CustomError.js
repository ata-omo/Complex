class CustomError extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;

        // abstract implementation details from user
        // Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;
const CustomError = require('../utils/CustomError');


const handleError = (err, req, res, next) => {

    // console.log(err);
    

    // handle Database CastError
    if(err.name == "CastError"){
        err = new CustomError(400, `Incorrect ${err.path} provided`);
    }

    // handle duplicate key error
    if(err.code === 11000){
        err = new CustomError(400, `${Object.keys(err.keyValue)} already in use`);
    }

    // handle Invalid JWT Error
    if(err.name === 'JsonWebTokenError'){
        err = new CustomError(403, "Authentication Failed, Invalid Json Web Token");
    }

    // handle JWT Expire Error
    if(err.name === 'TokenExpiredError'){
        err = new CustomError(403, 'Authentication Failed, Json Web Token Expired');
    }

    let { statusCode, message } = err;

    if(!statusCode){
        statusCode = 500;
    }
    if(!message) message = "Internal Server Error";


    res.status(statusCode).json({
        success: false,
        message
    });
};


module.exports = handleError;
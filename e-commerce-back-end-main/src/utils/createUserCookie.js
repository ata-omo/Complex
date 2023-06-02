// Creating and Saving JWT in Cookie

const createUserCookie = (user, statusCode, res, message) => {
    const token = user.getJWToken();

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE_DAYS * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    const responseObj = message
    ? {
        success: true, 
        user, 
        message
    }
    : {
        success: true, 
        user, 
    }
    
    res.status(statusCode)
    .cookie("token", token, cookieOptions)
    .json(responseObj);
};


module.exports = createUserCookie;
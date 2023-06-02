const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");
const { userModel: User } = require("../models/userModel");

const checkAuthentication = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new CustomError(401, "Login Required to access this resource"));
        }

        const jwtDecodedData = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(jwtDecodedData.id);
        if(!user){
            return next(new CustomError(404, "User Not Found"));
        }

        req.user = user;

        next();
    } catch(err) {
        next(err);
    }
};

const checkAuthorization = async (authorizedRoles, req, res, next) => {
    try{
        if(!authorizedRoles.includes(req.user.role)){
            next(new CustomError(403, `User Role: ${req.user.role}, does not have access to this resource`));
        }

        next();

    } catch(err) {
        next(err);
    }
}

module.exports = { 
    checkAuthentication, 
    checkAuthorization
};

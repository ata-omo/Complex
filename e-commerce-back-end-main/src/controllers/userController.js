const { userModel:User } = require('../models/userModel');
const CustomError = require('../utils/CustomError');
const createUserCookie = require('../utils/createUserCookie');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');

// create user
const createUser = async(req, res, next) => {
    try {
        const {name, email, password} =  req.body;
        const user = await User.create({name, email, password, role: req.body.role});

        createUserCookie(user, 201, res);

    } catch (err) {
        next(new CustomError(400, err.message));
    }
};

// Login user
const loginUser = async(req, res, next) => {
    try {
        const {email, password} =  req.body;
        if((!email) || (!password)){
            throw new Error("email and password cannot be empty");
        }

        const user = await User.findOne({email}).select("+password");
        if(!user){
            throw new Error("Invalid email or password");
        }

        const okPassword = await user.checkPassword(password);
        if(!okPassword){
            throw new Error("Invalid email or password");
        }

        createUserCookie(user, 200, res);

    } catch (err) {
        next(new CustomError(400, err.message));
    }
};

// Logout user
const logoutUser = async(req, res, next) => {
    // console.log(req.user);

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200).json({
        success: true, 
        // user: req.user
    })
};

// update Password pre processor
const forgotPassoword = async(req, res, next) => {
    try{
        const { email } = req.body;
        let user = await User.findOne({email});
        if(!user){
            return next(new CustomError(404, "user not found"));
        }

        const resetToken = await user.getResetPasswordToken();

        // saving user after setting reset token
        await user.save({validateBeforeSave: false});

        // sending reset password link as mail to user
        const resetPasswordURL = `http://${req.get("host")}/api/v1/password/reset/${resetToken}`;

        // console.log(user.resetPasswordExpire);

        const message = `Click the link below to reset your password:\n\n${resetPasswordURL}\n\nThe link is valid for next 10 minutes.\nKindly ignore if not requested`;
        
        try{ 
            await sendMail({
                to:email,
                subject: 'Complex Password Reset',
                message,
            });

            res.status(200).json({
                success: true,
                message: `Password reset link has been sent successfully to ${email}`
            });

        } catch(err) {
            user.resetPasswordToken = null;
            user.resetPasswordExpire = null;
            await user.save({validateBeforeSave: false});

            return next(new CustomError(500, err.message));
        }


    } catch(err) {
        next(err);
    }
};

// Reset Password
const resetPassword = async(req, res, next) => {
    try {

        if(req.body.password !== req.body.confirmPassword){
            return next(400, "Password and confirm Password does not match");
        }

        const { token } = req.params;

        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({resetPasswordToken}).select("+password");

        if(!user){
            return next(new CustomError(401, "Invalid Password Reset Link"));
        }

        if(new Date(Date.now()) >= user.resetPasswordExpire){
            user.resetPasswordToken = null;
            user.resetPasswordExpire = null; 
            await user.save({validateBeforeSave: false});

            return next(new CustomError(403, "Passoword Reset Link Expired"));
        }

        const samePassword = await user.checkPassword(req.body.password);
        if(samePassword){
            return next(new CustomError(403, "New password cannot be same as the old password"));
        }
        
        user.password = req.body.password;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Your password has been updated successfully"
        });

    } catch (err) {
        next(err);
    }
};

// get user details
const getUserDetails = async(req, res, next) => {
    try{

        res.status(200).json({
            success: true, 
            user: req.user,
        });

    } catch(err) {
        next(err);
    }
};

// update password
const updatePassword = async(req, res, next) => {
    try{
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if(!oldPassword){
            return next(new CustomError(400, "Old Password is Required"));
        }
        if(newPassword !== confirmPassword){
            return next( new CustomError(400, "Password and confirm Password does not match"));
        }

        const user = await User.findById(req.user.id).select("+password");

        const okPassword = await user.checkPassword(oldPassword);
        if(!okPassword){
            return next( new CustomError(403, "Password does not match"));
        }

        user.password = newPassword;
        await user.save();

        const message = "Passoword Updated successfully";
        createUserCookie(user, 200, res, message);

    } catch(err){
        next(err);
    }
};

// update user account
const updateAccount = async(req, res, next) => {
    try {
        const {name, email} = req.body;
        const newUserData = {
            name,
            email
        }

        const updateQueryResult = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            rawResult: true
        });

        if(updateQueryResult.lastErrorObject.updatedExisting === false){
            return next(new CustomError(500, "Update Failed, Try Again!"));
        }

        res.status(200).json({
            success: true,
            user: updateQueryResult.value
        });
        
    } catch (err) {
        next(err);
    }
    
};

// delete user account
const deleteAccount = async(req, res, next) => {
    try {

        if(req.user.role == "master"){
            return next(new CustomError(403, "Restricted resource, master cannot be deleted"));
        }

        const user = await User.findByIdAndDelete(req.user.id);
        if(!user){
            return next(new CustomError(404, "User Not Found"));
        }

        res.status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()), 
            httpOnly: true
        })
        .json({
            success: true
        });

    } catch (err) {
        next(err);
    }
};


// ADMIN METHODS

// get all users
const getAllUsers = async(req, res, next) => {
    try{
        const users = await User.find();

        res.status(200).json({
            success: true,
            users
        });

    } catch(err){
        next(err);
    }
};

// get single user info
const getUserForAdmin = async(req, res, next) => {
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return next(new CustomError(404, "No User Found"));
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch(err){
        next(err);
    }
};

// update user role
const updateUserRole = async(req, res, next) => {
    try {
        if(req.params.id === req.user.id){
            return next(new CustomError(403, "Resource restricted, cannot change own role!"));
        }

        if(req.body.role === "master"){
            return next(new CustomError(403, "Restricted resource, cannot change role to master"))
        }

        const user = await User.findById(req.params.id);

        if(user.role === "master"){
            return next(new CustomError(403, "Restricted resource, role of master cannot be updated"));
        }

        user.role = req.body.role;

        await user.save({validateBeforeSave: true});

        res.status(200).json({
            success: true,
            user
        });

    } catch (err) {
        next(err);
    }
};

// Delete User
const deleteUser = async(req, res, next) => {
    try {

        if(req.params.id === req.user.id){
            return next(new CustomError(403, "You cannot delete your own account using admin privilages"))
        }

        const user = await User.findById(req.params.id);
        if(!user){
            return next(new CustomError(404, "User not found"));
        }

        if(user.role === "master"){
            return next(new CustomError(403, "Restricted resource, master cannot be deleted"));
        }

        await User.deleteOne({_id: req.params.id});
        
        res.status(200).json({
            success: true, 
        })
        
    } catch (err) {
        next(err);
    }
}


module.exports = {
    createUser, 
    loginUser, 
    logoutUser,
    forgotPassoword, 
    resetPassword, 
    getUserDetails, 
    updatePassword, 
    updateAccount, 
    deleteAccount, 
    getAllUsers, 
    getUserForAdmin, 
    updateUserRole, 
    deleteUser
}
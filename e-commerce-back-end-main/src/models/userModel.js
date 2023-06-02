const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema(
    {
        name:{
            type:String, 
            required: [true, "Name cannot be empty"], 
            maxLength: [30, 'Name cannot have more than 30 characters'], 
            minLength: [2, 'Name must have atleast 2 characters']
        }, 

        email: {
            type:String, 
            required: [true, "Name cannot be empty"], 
            unique: true,
            maxLength: [50, 'Email cannot have more than 50 characters'], 
            validate: {
                validator: (val) => Boolean(val.match(/([a-z0-9]+.)*[a-z0-9]+@([a-z]+.)+[a-z]+/)), 
                message: 'Invalid Email provided'
            }
        },

        password:{
            type:String, 
            required: [true, "Password cannot be empty"], 
            maxLength: [256, 'Password cannot have more than 256 characters'], 
            minLength: [8, 'Password must have atleast 8 characters'], 
            validate: [
                {
                    validator: (val) => !val.includes(' '),
                    message: "Password cannot contain space"
                }, 
                {
                    validator: (val) => /[A-Z]/.test(val), 
                    message: "Password must have an uppercase letter"
                }, 
                {
                    validator: (val) => /[a-z]/.test(val), 
                    message: "Password must have a lower letter"
                }, 
                {
                    validator: (val) => /[0-9]/.test(val), 
                    message: "Password must have a number"
                }, 
                {
                    validator: (val) => /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val), 
                    message: "Password must have a special character"
                }
            ], 
            select: false,
        }, 
        role:{type:String, default: "user"},

        resetPasswordToken: String,
        resetPasswordExpire: Date,
    }
);

// Hashing the Password before saving it in the database
userSchema.pre("save", async function(next){
    
    // saving email in lowercase format
    if(this.isModified("email")){
        this.email = this.email.toLowerCase();
    }

    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});


// method to return json web token for the user
userSchema.methods.getJWToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE_DAYS
    });
}


// method to match password
userSchema.methods.checkPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


// method to set reset password token
userSchema.methods.getResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(30).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

    return resetToken;
}


const userModel = mongoose.model("User", userSchema);

module.exports = {
    userModel
}
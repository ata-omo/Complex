const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId, 
        ref: "User", 
        required: true
    }, 

    orderItems: {
        type: [
            {
                product: {
                    type: mongoose.Types.ObjectId, 
                    ref: "Product", 
                    required: true
                }, 
                productTitle: {
                    type: String, 
                    required: true
                }, 
                price: {
                    type: Number, 
                    required: true,
                }, 
                quantity: {
                    type: Number, 
                    required: true
                }, 
                image: {
                    type: String, 
                    required: true
                }
            }
        ], 

        validate:{
            validator: (val) => { return val.length > 0 }, 
            message: "Order Items cannot be empty"
        }, 
    }, 

    shippingInfo: {
        address: {
            type: [String], 
            validate: [{
                validator: (val) => {return val.length > 0;}, 
                message: "Address cannot be empty"
            }]
        },
        city: { 
            type: String, 
            required: true
        },
        state: { 
            type: String, 
            required: true 
        },
        country: { 
            type: String, 
            required: true 
        },
        pincode: { 
            type: String, 
            required: true
        },
        phone: { 
            type: String, 
            required: true 
        },
    }, 

    paymentInfo: {
        transactionId: {
            type: String, 
            required: true
        }, 
        status: {
            type: String, 
            required: true
        }
    }, 

    deliveryDetails: {
        status:{
            type: String, 
            required: true, 
            default: "processing"
        }, 
        date: {
            type: Date, 
            required: true
        }
    }, 

    orderDate: {
        type: Date, 
        required: true, 
        default: new Date(Date.now())
    }, 

    charges: {
        itemsPrice: {
            type: Number, 
            required: true, 
            default: 0
        }, 
        
        taxPrice: {
            type: Number, 
            required: true, 
            default: 0
        }, 
        
        shippingPrice: {
            type: Number, 
            required: true, 
            default: 0
        }, 
    
        discountPrice: {
            type: Number, 
            required: true, 
            default: 0
        }, 
    
        totalPrice: {
            type: Number, 
            required: true, 
            default: 0
        }, 
    }
    
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = {
    orderModel
}

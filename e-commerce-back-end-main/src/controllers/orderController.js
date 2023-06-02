const { orderModel: Order } = require('../models/orderModel');
const { productModel: Product } = require('../models/productModel');
const CustomError = require('../utils/CustomError');


// Create Order
const createOrder = async(req, res, next) => {
    try {
        
        const user = req.user.id;
        const { orderItems, shippingInfo, paymentInfo, charges } = req.body;

        const deliveryDetails = {
            status: "processing", 
            date: new Date(Date.now() + process.env.DELIVERY_DAYS * 24 * 60 * 60 * 1000)
        }

        for(let item of orderItems){
            const product = await Product.findByIdAndUpdate(item.product, { $inc: {stock: -1 * item.quantity} });
            if(!product){
                return next(new CustomError(500, `Product ${item.productId} Not Found`));
            }

            item.productTitle = product.title;
            item.price = product.price;
            item.image = product.images[0].src;
        };

        const order = await Order.create({
            user, 
            orderItems, 
            shippingInfo, 
            paymentInfo, 
            charges, 
            deliveryDetails
        });

        if(!order){
            for(let item of orderItems){
                const product = await Product.findByIdAndUpdate(item.id, { $inc: {stock: item.quantity} });
                if(!product){
                    return next(new CustomError(500, `Product ${item.productId} Unavailable`));
                }
            };

            return next(new CustomError(500, "Internal Server Error"));
        }

        res.status(201).json({
            success: true, 
            order
        });

    } catch (err) {
        next(err);
    }
};


// get All Orders for user
const getAllOrders = async(req, res, next) => {
    try {
        
        const orders = await Order.find({user: req.user.id});

        res.status(200).json({
            success: true, 
            orders
        });

    } catch (err) {
        next(err);
    }
};


// get Single order
const getSingleOrder = async(req, res, next) => {
    try {
        
        const order = await Order.findOne({_id: req.params.id, user: req.user.id});

        if(!order){
            return next(new CustomError(404, `Order id: ${req.params.id} is invalid, No Order Found`));
        }

        res.status(200).json({
            success: true, 
            order
        });

    } catch (err) {
        next(err);
    }
};



// ADMIN METHODS

// get All Orders 
const getAllOrdersAdmin = async(req, res, next) => {
    try {
        
        const orders = await Order.find();

        res.status(200).json({
            success: true, 
            orders
        });

    } catch (err) {
        next(err);
    }
};


// get Single order
const getSingleOrderAdmin = async(req, res, next) => {
    try {
        
        const order = await Order.findById(req.params.id);

        if(!order){
            return next(new CustomError(404, `Order id: ${req.params.id} is invalid, No Order Found`));
        }

        res.status(200).json({
            success: true, 
            order
        });

    } catch (err) {
        next(err);
    }
};


// update order status
const updateOrderStatusAdmin = async(req, res, next) => {
    try{

        const orderStates = ["processing", "shipped", "delivered", "returned"];

        const orderId = req.query.id;
        const newStatus = req.body.status;
        
        const order = await Order.findById(orderId);

        if(!order){
            return next(new CustomError(404, `Order ${orderId} Unavailable`));
        }

        const currStatus = order.deliveryDetails.status;

        const indexCurrStatus = orderStates.indexOf(currStatus);

        if(orderStates[indexCurrStatus+1] !== newStatus){
            return next(new CustomError(400, `Cannot set the order status to ${newStatus}, order is ${currStatus}`));
        }

        order.deliveryDetails.status = newStatus;

        await order.save()

        res.status(200).json({
            success: true, 
            order
        });

    } catch(err) {
        next(err);
    }
};


// delete order
const deleteOrderAdmin = async(req, res, next) => {
    try {

        const order = await Order.findByIdAndDelete(req.query.id);

        if(!order){
            return next(new CustomError(404, `Order ${req.query.id} Unavailable`));
        }

        res.status(200).json({
            success: true, 
            order
        });

    } catch (err) {
        return next(err);
    }
};


module.exports = {
    createOrder, 
    updateOrderStatusAdmin, 
    getAllOrders, 
    getSingleOrder, 
    getAllOrdersAdmin, 
    getSingleOrderAdmin, 
    deleteOrderAdmin
};
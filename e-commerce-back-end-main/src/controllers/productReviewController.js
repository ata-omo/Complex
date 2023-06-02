const {productModel: Product} = require("../models/productModel");
const CustomError = require("../utils/CustomError");

// Create / Update Review
const createReview = async(req, res, next) => {
    try{
        const currUserId = req.user.id;

        const review = {
            userId: currUserId, 
            username: req.user.name, 
            rating: req.body.rating, 
            title: req.body.title,
            comment: req.body.comment
        }

        const product = await Product.findById(req.params.id);

        if(!product){
            return next(new CustomError(404, "Invlaid product id"));
        }


        let reviewIndex = -1;
        for( let idx in product.reviews ){
            if(product.reviews[idx].userId == currUserId){
                reviewIndex = idx;
                break;
            }
        }

        if(reviewIndex == -1){
            product.reviews.push(review);
            product.ratings.value = (product.ratings.value * product.ratings.count + review.rating)/(++product.ratings.count);
        }
        else{
            product.ratings.value = (product.ratings.value * product.ratings.count - product.reviews[reviewIndex].rating + review.rating)/(product.ratings.count);
            product.reviews[reviewIndex] = review;
        }

        await product.save();

        res.status(200).json({
            success: true, 
            product
        })

    } catch(err) {
        return next(err);
    }
};

// get all reviews
const getAllReviews = async(req, res, next) => {
    try {

        const reviews = (await Product.findById(req.params.id, {reviews: 1, _id: 0})).reviews;

        res.status(200).json({
            success: true, 
            reviews
        });
        
    } catch (err) {
        next(err);
    }
};


// delete a review
const deleteReview = async(req, res, next) => {
    try {  

        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new CustomError(404, "Invalid Product Id"));
        }
        
        let deletedReview;

        product.reviews = product.reviews.filter((review) => {
            if(review.userId === req.user.id){
                deletedReview = review;
                return false;
            }
            
            return true;
        });

        if(!deletedReview){
            return next(new CustomError(400, `No Comments found from ${req.user.name} for this product`));
        }

        product.ratings.value = (product.ratings.value * product.ratings.count - deletedReview.rating)/(product.ratings.count - 1) || 0;
        product.ratings.count -= 1;

        await product.save();

        res.status(200).json({
            success: true, 
            product
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    createReview, 
    getAllReviews, 
    deleteReview
}
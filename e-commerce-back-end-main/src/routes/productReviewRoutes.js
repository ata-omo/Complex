const express = require("express");
const { createReview, getAllReviews, deleteReview } = require('../controllers/productReviewController');
const { checkAuthentication } = require('../middlewares/auth');

const router = express.Router();

router.route('/products/:id/reviews')
    .post(checkAuthentication, createReview)
    .get(getAllReviews)
    .delete(checkAuthentication, deleteReview);


module.exports = router;
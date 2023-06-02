const express = require('express');
const { createOrder, getAllOrders, getSingleOrder, getAllOrdersAdmin, getSingleOrderAdmin, updateOrderStatusAdmin, deleteOrderAdmin } = require('../controllers/orderController');
const { checkAuthentication, checkAuthorization } = require('../middlewares/auth');

const router = express.Router();

const AUTHORIZED_ROLES = ["admin", "master"];
const authorize = (req, res, next) => { checkAuthorization(AUTHORIZED_ROLES, req, res, next) };


router.route('/orders/new').post(checkAuthentication, createOrder);

router.route('/orders').get(checkAuthentication, getAllOrders);

router.route('/orders/:id').get(checkAuthentication, getSingleOrder);


// ADMIN ROUTES

router.route('/admin/orders').get(checkAuthentication, authorize, getAllOrdersAdmin);

router.route('/admin/orders/:id').get(checkAuthentication, authorize, getSingleOrderAdmin);

router.route('/admin/orders/update').patch(checkAuthentication, authorize, updateOrderStatusAdmin);

router.route('/admin/orders/delete').delete(checkAuthentication, authorize, deleteOrderAdmin);


module.exports = router;
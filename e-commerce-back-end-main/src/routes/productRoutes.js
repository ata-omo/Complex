const express = require('express');
const {getAllProducts, createProduct, getProduct, deleteProduct, updateProduct} = require('../controllers/productController');
const { checkAuthentication, checkAuthorization } = require('../middlewares/auth');

const AUTHORIZED_ROLES = ["admin", "master"];
const authorize = (req, res, next) => { checkAuthorization(AUTHORIZED_ROLES, req, res, next) };

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route('/products/:id').get(getProduct);


// ADMIN ROUTEs
router.route("/admin/products/new").post(checkAuthentication, authorize, createProduct);

router.route('/admin/products/:id')
    .delete(checkAuthentication, authorize, deleteProduct)
    .patch(checkAuthentication, authorize, updateProduct);
    

module.exports = router;
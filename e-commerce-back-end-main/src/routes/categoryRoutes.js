const express = require('express');
const { createCategory, updateCategory, deleteCategory, getAllCategory } = require('../controllers/categoryController');
const { checkAuthentication, checkAuthorization } = require('../middlewares/auth');

const router = express.Router();

const AUTHORIZED_ROLES = ["master", "admin"];

const authorize = (req, res, next) => { checkAuthorization(AUTHORIZED_ROLES, req, res, next); };


router.route('/admin/category/new').post(checkAuthentication, authorize, createCategory);

router.route('/admin/category/update').post(checkAuthentication, authorize, updateCategory);

router.route('/admin/category/delete').post(checkAuthentication, authorize, deleteCategory);

router.route('/admin/category/new').post(checkAuthentication, authorize, getAllCategory);


module.exports = router;
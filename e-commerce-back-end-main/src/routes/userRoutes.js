const { Router } = require('express');
const { createUser, loginUser, logoutUser, forgotPassoword, resetPassword, getUserDetails, updatePassword, updateAccount, deleteAccount, getAllUsers, getUserForAdmin, updateUserRole, deleteUser } = require('../controllers/userController');
const { checkAuthentication, checkAuthorization } = require('../middlewares/auth');

const AUTHORIZED_ROLES = ["admin", "master"];
const authorize = (req, res, next) => { checkAuthorization(AUTHORIZED_ROLES, req, res, next) };

const router = Router();

router.route('/register').post(createUser);

router.route('/login').post(loginUser);

router.route('/logout').get(checkAuthentication, logoutUser);

router.route('/password/forgot').post(forgotPassoword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/account')
    .get(checkAuthentication, getUserDetails)
    .put(checkAuthentication, updateAccount)
    .delete(checkAuthentication, deleteAccount);

router.route('/password/update').put(checkAuthentication, updatePassword);


// ADMIN ROUTES
router.route('/admin/users').get(checkAuthentication, authorize, getAllUsers);

router.route('/admin/user/:id')
    .get(checkAuthentication, authorize, getUserForAdmin)
    .put(checkAuthentication, authorize, updateUserRole)
    .delete(checkAuthentication, authorize, deleteUser);

module.exports = router;

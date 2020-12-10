const router = require('express').Router();

const { userRegist, userLogin } = require('../controllers/user_controller');

router.route('/user/registered').post(userRegist);
router.route('/user/login').post(userLogin);

module.exports = router;

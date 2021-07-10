const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/signup2', authController.signup2_get);
router.post('/signup2', authController.signup2_post);
router.get('/signin', authController.login_get);
router.post('/signin', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;
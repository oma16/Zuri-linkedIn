const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/signin', authController.login_get);
router.post('/signin', authController.login_post);

module.exports = router;
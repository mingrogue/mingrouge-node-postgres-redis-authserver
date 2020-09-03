const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/users');
const middleware = require('../middleware/middleware')


router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/show-all', middleware.validateToken, AuthController.showAll);
router.get('/profile', middleware.validateToken, AuthController.showProfile);

module.exports = router;
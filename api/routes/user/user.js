const express = require("express");
const router = express.Router();

const {validateCreateUser} = require('./userValidator');
const {userPostController, userGetController, userLoginController} = require('../../controller/user/userController');
const {authMiddleware} = require('../../middleware/authMiddleware');

router.post('', [validateCreateUser], userPostController);
router.post('/login', userLoginController);

router.get('/:id', userGetController);

module.exports = router;

const {blogGetAllController, blogPostController, blogGetController, blogPatchController, blogDeleteController} = require('../../controller/blog/blogController');
const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../../middleware/authMiddleware');

router.get('/', blogGetAllController);
router.get('/:id', blogGetController);
router.post('/', authMiddleware, blogPostController);
router.patch('/:id', authMiddleware, blogPatchController);
router.delete('/:id', authMiddleware, blogDeleteController);

//router.patch('/:id', authMiddleware, userGetController);

module.exports = router;

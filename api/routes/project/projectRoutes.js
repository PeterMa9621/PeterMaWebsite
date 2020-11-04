const {projectGetAllController, projectPostController, projectGetController, projectPatchController, projectDeleteController} = require('../../controller/project/projectController');
const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../../middleware/authMiddleware');

router.get('/', projectGetAllController);
router.get('/:id', projectGetController);
router.post('/', authMiddleware, projectPostController);
router.patch('/:id', authMiddleware, projectPatchController);
router.delete('/:id', authMiddleware, projectDeleteController);

module.exports = router;

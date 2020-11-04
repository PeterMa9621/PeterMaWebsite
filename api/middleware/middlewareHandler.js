const express = require("express");
const router = express.Router();

const authMiddleware = require('./authMiddleware');

function isInBlacklist(urlPath) {
    let urlPathList = urlPath.split('/')
}

router.use(function (req, res, next) {
    let urlPath = req.originalUrl;
});

module.exports = router;

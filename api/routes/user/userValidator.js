const { body, validationResult } = require('express-validator');

exports.validateCreateUser = [
    body('username', "name must be a string").isString(),
    body('username', "name must be provided").notEmpty(),

    body('password', "description must be a string").isString(),
    body('password', "description must be provided").notEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: 422,
                errors: errors.array(),
            });
        }
        next();
    }
];



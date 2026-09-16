import {validationResult} from 'express-validator';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({ statusCode: 400, status: 'fail', message: "Validation error", errors: errors.array() });
        }
    next();
};
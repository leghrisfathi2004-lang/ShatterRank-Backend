import {validationResult} from 'express-validator';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({ status: 400, message: "Validation error", errors: errors.array() });
        }
    next();
};
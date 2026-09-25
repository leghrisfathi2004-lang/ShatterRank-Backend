import { body } from 'express-validator';

const isPowerOfTwo = (n) => n >= 2 && (n & (n - 1)) === 0;

export const TournoiValidator = [
  body('name').trim().notEmpty().withMessage('Tournoi name is required'),
  body('prizeId').optional().isMongoId().withMessage('Valid prize id is required'),
  body('teamIds')
    .isArray().withMessage('teamIds must be an array')
    .custom((arr) => isPowerOfTwo(arr.length))
    .withMessage('teamIds length must be a power of 2 (2, 4, 8, 16, ...)'),
  body('teamIds.*').isMongoId().withMessage('Each teamId must be a valid Id'),
];
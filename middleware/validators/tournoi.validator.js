import { body } from 'express-validator';

export const TournoiValidator = [
  body('name').trim().notEmpty().withMessage('Tournoi name is required'),
  body('prizeId').optional().isMongoId().withMessage('Valid prize id is required'),
  body('teams')
    .isArray().withMessage('Teams must be an array')
];
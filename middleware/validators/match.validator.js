import { body, param } from 'express-validator';

export const addMatchValidator = [
  body('teams')
    .isArray({ min: 2, max: 2 })
    .withMessage('Teams must be an array of exactly 2'),
];

export const teamIdValidator = [
  param('id').isMongoId().withMessage('Invalid match id'),
  body('teamId')
    .isMongoId()
    .withMessage('Team id must be a valid Id'),
];

export const finishMatchValidator = [
  param('id').isMongoId().withMessage('Invalid match id'),
  body('winnerId').isMongoId().withMessage('Winner id must be a valid Id'),
];
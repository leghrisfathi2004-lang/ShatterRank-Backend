import { body, param } from 'express-validator';

export const addMatchValidator = [
  body('teamId1').isMongoId().withMessage('teamId1 must be a valid Id'),
  body('teamId2').isMongoId().withMessage('teamId2 must be a valid Id'),
];

export const teamIdValidator = [
  param('id').isMongoId().withMessage('Invalid match id'),
  body('teamId')
    .isMongoId()
    .withMessage('Team id must be a valid Id'),
  body('scorerId')
    .isMongoId()
    .withMessage('Scorer id must be a valid Id'),
];

export const finishMatchValidator = [
  param('id').isMongoId().withMessage('Invalid match id'),
  body('winnerId').isMongoId().withMessage('Winner id must be a valid Id'),
];
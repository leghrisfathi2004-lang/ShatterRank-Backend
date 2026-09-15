import { body, param } from 'express-validator';

export const addGCValidator = [
  body('code').trim().notEmpty().withMessage('Code is required'),
  body('provider').trim().notEmpty().withMessage('Provider is required'),
  body('value').trim().notEmpty().withMessage('Value is required'),
];

export const assignGCValidator = [
  param('id').isMongoId().withMessage('Invalid gift card id'),
  body('winnerId').isMongoId().withMessage('Valid winnerId is required'),
];
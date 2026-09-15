import { body, param } from 'express-validator';

export const TeamValidator = [
  param('LeaderId').isMongoId().withMessage('Invalid leader id'),
  body('name').trim().notEmpty().withMessage('Team name is required'),
];
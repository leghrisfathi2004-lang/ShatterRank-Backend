import { body } from 'express-validator';

export const TeamValidator = [
  body('name').trim().notEmpty().withMessage('Team name is required'),
];

export const joinTeamValidator = [
  body('teamId').isMongoId().withMessage('Team id must be a valid Id'),
];
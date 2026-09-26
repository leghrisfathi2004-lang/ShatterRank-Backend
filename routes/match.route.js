import express from "express";

import {getMatchs, getMatchId, addMatch, addGoalMatch, finishMatch, startMatch, getMatchProfile} from '../controllers/match.controller.js';
import { addMatchValidator, teamIdValidator, finishMatchValidator } from "../middleware/validators/match.validator.js";
import { validate } from "../middleware/validate.js";
import { authenticate, requireRole } from "../middleware/authenticate.js";
import { pagination } from "../middleware/pagination.js";

const matchRoute = express.Router();
const admin = requireRole('admin');

matchRoute.use(authenticate);

matchRoute.get('/', pagination, getMatchs);
matchRoute.get('/:id', getMatchId);
matchRoute.get('/:id/profile', getMatchProfile);
matchRoute.post('/new', admin, addMatchValidator, validate, addMatch);
matchRoute.patch('/:id/goal', admin, teamIdValidator, validate, addGoalMatch);
matchRoute.patch('/:id/finish', admin, finishMatchValidator, validate, finishMatch);
matchRoute.patch('/:id/start', admin, startMatch);

export default matchRoute;
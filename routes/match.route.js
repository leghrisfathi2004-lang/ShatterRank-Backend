import express from "express";

import {getMatchs, getMatchId, addMatch, addGoalMatch, finishMatch, startMatch, getMatchProfile} from '../controllers/match.controller.js';
import { addMatchValidator, teamIdValidator, finishMatchValidator } from "../middleware/validators/match.validator.js";
import { validate } from "../middleware/validate.js";
import { authenticate, requireRole } from "../middleware/authenticate.js";
import { pagination } from "../middleware/pagination.js";

const matchRoute = express.Router();
const admin = requireRole('admin');

matchRoute.use(authenticate);

matchRoute.get('/matchs', pagination, getMatchs);
matchRoute.get('/matchs/:id', getMatchId);
matchRoute.get('/matchs/:id/profile', getMatchProfile);
matchRoute.post('/matchs/new', admin, addMatchValidator, validate, addMatch);
matchRoute.patch('/matchs/:id/goal', admin, teamIdValidator, validate, addGoalMatch);
matchRoute.patch('/matchs/:id/finish', admin, finishMatchValidator, validate, finishMatch);
matchRoute.patch('/matchs/:id/start', admin, startMatch);

export default matchRoute;
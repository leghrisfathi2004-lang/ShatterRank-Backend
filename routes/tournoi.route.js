import express from "express";

import {TournoiValidator} from "../middleware/validators/tournoi.validator.js";
import { validate } from "../middleware/validate.js";
import { authenticate, requireRole } from "../middleware/authenticate.js";
import { pagination } from "../middleware/pagination.js";
import {  getAllTournois, getTournoiById, closeTournoi, addTournoi, getTournoiProfile } from "../controllers/tournoi.controller.js";

const TournoiRoute = express.Router();
const admin = requireRole('admin');

TournoiRoute.use(authenticate);

TournoiRoute.get('/', pagination, getAllTournois);
TournoiRoute.get('/:id', getTournoiById);
TournoiRoute.get('/:id/profile', getTournoiProfile);
TournoiRoute.post('/new', admin, TournoiValidator, validate, addTournoi);
TournoiRoute.put('/:id/close', admin, closeTournoi);

export default TournoiRoute;
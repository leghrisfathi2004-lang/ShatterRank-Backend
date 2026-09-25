import express from "express";

import {TournoiValidator} from "../middleware/validators/tournoi.validator.js";
import { validate } from "../middleware/validate.js";
import { authenticate, requireRole } from "../middleware/authenticate.js";
import { pagination } from "../middleware/pagination.js";
import {  getAllTournois, getTournoiById, closeTournoi, addTournoi, getTournoiProfile } from "../controllers/tournoi.controller.js";

const TournoiRoute = express.Router();
const admin = requireRole('admin');

TournoiRoute.use(authenticate);

TournoiRoute.get('/tournois', pagination, getAllTournois);
TournoiRoute.get('/tournois/:id', getTournoiById);
TournoiRoute.get('/tournois/:id/profile', getTournoiProfile);
TournoiRoute.post('/tournois/new', admin, TournoiValidator, validate, addTournoi);
TournoiRoute.put('/tournois/:id/close', admin, closeTournoi);

export default TournoiRoute;
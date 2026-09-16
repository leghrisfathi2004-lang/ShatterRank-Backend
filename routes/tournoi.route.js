import express from "express";

import {TournoiValidator} from "../middleware/validators/tournoi.validator.js";
import { validate } from "../middleware/validate.js";
import { authenticate, requireRole } from "../middleware/authenticate.js";
import {  getAllTournois, getTournoiById, closeTournoi, addTournoi, getTournoiProfile } from "../controllers/tournoi.controller.js";

const TournoiRoute = express.Router();
const admin = [authenticate, requireRole('admin')];

TournoiRoute.get('/tournois', getAllTournois);
TournoiRoute.get('/tournois/:id', getTournoiById);
TournoiRoute.get('/tournois/:id/profile', getTournoiProfile);
TournoiRoute.post('/tournois/new', admin, TournoiValidator, validate, addTournoi);
TournoiRoute.put('/tournois/:id/close', admin, closeTournoi);

export default TournoiRoute;
import express from "express";

import {TournoiValidator} from "../middleware/validators/tournoi.validator";
import { validate } from "../middleware/validate";
import {  getAllTournois, getTournoiById, closeTournoi, addTournoi } from "../controllers/tournoi.controller.js";

const TournoiRoute = express.Router();

TournoiRoute.get('/tournois', getAllTournois);
TournoiRoute.get('/tournois/:id', getTournoiById);
TournoiRoute.post('/tournois/new', TournoiValidator, validate, addTournoi);
TournoiRoute.put('/tournois/:id/close', closeTournoi);

export default TournoiRoute;
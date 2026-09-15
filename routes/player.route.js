import express from "express";

import { getPlayers, getPlayerId, addToTeam } from "../controllers/player.controller"
import { teamIdValidator } from "../middleware/validators/match.validator";
import { validate } from "../middleware/validate";

const playerRoute = express.Router();

playerRoute.get('/players', getPlayers);
playerRoute.get('/players/:id', getPlayerId);
playerRoute.post('/players/:id/addteam', teamIdValidator, validate ,addToTeam);

export default playerRoute;
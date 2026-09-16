import express from "express";

import { getPlayers, getPlayerId, addToTeam, quitTeam, getPlayerProfile } from "../controllers/player.controller.js"
import { joinTeamValidator } from "../middleware/validators/team.validator.js";
import { validate } from "../middleware/validate.js";
import { authenticate } from "../middleware/authenticate.js";

const playerRoute = express.Router();

playerRoute.get('/players', getPlayers);
playerRoute.get('/players/:id', getPlayerId);
playerRoute.get('/players/:id/profile', getPlayerProfile);
playerRoute.post('/players/join', authenticate, joinTeamValidator, validate, addToTeam);
playerRoute.post('/players/quit', authenticate, quitTeam);

export default playerRoute;
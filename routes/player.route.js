import express from "express";

import { getPlayers, getPlayerId, addToTeam, quitTeam, getMe, getLeaderboard } from "../controllers/player.controller.js"
import { joinTeamValidator } from "../middleware/validators/team.validator.js";
import { validate } from "../middleware/validate.js";
import { authenticate } from "../middleware/authenticate.js";
import { pagination } from "../middleware/pagination.js";

const playerRoute = express.Router();

playerRoute.use(authenticate);

playerRoute.get('/players', pagination, getPlayers);
playerRoute.get('/players/me', getMe);
playerRoute.get('/players/leaderboard', pagination, getLeaderboard);
playerRoute.get('/players/:id', getPlayerId);
playerRoute.post('/players/join', joinTeamValidator, validate, addToTeam);
playerRoute.post('/players/quit', quitTeam);

export default playerRoute;
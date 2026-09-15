import express from "express";

import { getAllTeams, getOpenTeams, getFullTeams, getTeamId, postTeam } from "../controllers/team.controller.js";
import { TeamValidator } from "../middleware/validators/team.validator.js";
import { validate } from "../middleware/validate.js";

const teamRoute = express.Router();

teamRoute.get("/teams", getAllTeams);
teamRoute.get("/teams/open", getOpenTeams);
teamRoute.get("/teams/full", getFullTeams);
teamRoute.get("/teams/:id", getTeamId);
teamRoute.post("/teams/new",TeamValidator, validate, postTeam);

export default teamRoute;
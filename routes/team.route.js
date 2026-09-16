import express from "express";

import { getAllTeams, getOpenTeams, getFullTeams, getTeamId, postTeam, getTeamProfile } from "../controllers/team.controller.js";
import { TeamValidator } from "../middleware/validators/team.validator.js";
import { validate } from "../middleware/validate.js";
import { authenticate } from "../middleware/authenticate.js";

const teamRoute = express.Router();

teamRoute.get("/teams", getAllTeams);
teamRoute.get("/teams/open", getOpenTeams);
teamRoute.get("/teams/full", getFullTeams);
teamRoute.get("/teams/:id", getTeamId);
teamRoute.get("/teams/:id/profile", getTeamProfile);
teamRoute.post("/teams/new", authenticate, TeamValidator, validate, postTeam);

export default teamRoute;
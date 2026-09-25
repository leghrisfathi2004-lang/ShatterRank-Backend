import express from "express";

import { getAllTeams, getOpenTeams, getFullTeams, getTeamId, postTeam, getTeamProfile } from "../controllers/team.controller.js";
import { TeamValidator } from "../middleware/validators/team.validator.js";
import { validate } from "../middleware/validate.js";
import { authenticate } from "../middleware/authenticate.js";
import { pagination } from "../middleware/pagination.js";

const teamRoute = express.Router();

teamRoute.use(authenticate);

teamRoute.get("/teams", pagination, getAllTeams);
teamRoute.get("/teams/open", pagination, getOpenTeams);
teamRoute.get("/teams/full", pagination, getFullTeams);
teamRoute.get("/teams/:id", getTeamId);
teamRoute.get("/teams/:id/profile", getTeamProfile);
teamRoute.post("/teams/new", TeamValidator, validate, postTeam);

export default teamRoute;
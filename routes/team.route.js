import express from "express";

import { getAllTeams, getOpenTeams, getFullTeams, getTeamId, postTeam, getTeamProfile } from "../controllers/team.controller.js";
import { TeamValidator } from "../middleware/validators/team.validator.js";
import { validate } from "../middleware/validate.js";
import { authenticate } from "../middleware/authenticate.js";
import { pagination } from "../middleware/pagination.js";

const teamRoute = express.Router();

teamRoute.use(authenticate);

teamRoute.get("/", pagination, getAllTeams);
teamRoute.get("/open", pagination, getOpenTeams);
teamRoute.get("/full", pagination, getFullTeams);
teamRoute.get("/:id", getTeamId);
teamRoute.get("/:id/profile", getTeamProfile);
teamRoute.post("/new", TeamValidator, validate, postTeam);

export default teamRoute;
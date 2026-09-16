import { GetAll, GetById, addGoal as addGoalService, createFriendly, addWinner, start, getProfile } from "../services/match.service.js";
import successRes from "../utils/Respond.js";

export async function getMatchs (req, res, next) {
    try {
        const matches = await GetAll();
        successRes(res, 200, "Get success!", matches)
    }
    catch (e) {
        next(e);
    }
}

export async function getMatchId (req, res, next){
    try {
        const {id} = req.params;
        const match = await GetById(id);
        successRes(res, 200, "Get success!", match)
    }
    catch (e) {
        next(e);
    }
}

export async function addMatch (req, res, next) {
    try {
        const { teamId1, teamId2, Date } = req.body;
        const match = await createFriendly({ teamId1, teamId2, Date });
        successRes(res, 201, "Friendly match created successfully!", match)
    } catch (e) {
        next(e);
    }
}

export async function addGoalMatch (req, res, next) {
    try {
        const {id} = req.params;
        const { teamId } = req.body;
        const match = await addGoalService(id, teamId);
        successRes(res, 200, "Goal added successfully!", match)
    } catch (e) {
        next(e);
    }
}

export async function finishMatch (req, res, next) {
    try {
        const {id} = req.params;
        const {winnerId} = req.body;
        const match = await addWinner(id, winnerId);
        successRes(res, 200, "Update success!", match)
    } catch (e) {
        next(e);
    }
}

export async function startMatch (req, res, next) {
    try {
        const {id} = req.params;
        const match = await start(id);
        successRes(res, 200, "Match started successfully!", match)
    } catch (e) {
        next(e);
    }
}

export async function getMatchProfile (req, res, next) {
    try {
        const { id } = req.params;
        const profile = await getProfile(id);
        successRes(res, 200, "Get success!", profile);
    } catch (e) {
        next(e);
    }
}
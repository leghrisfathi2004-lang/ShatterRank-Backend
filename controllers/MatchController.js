import { GetAll, GetById, addGoal, add, addWinner, start } from "../services/matchService.js";
import successRes from "../utils/Respond.js";

export default async function getMatches (req, res, next) {
    try {
        const matches = await GetAll();
        successRes(res, 200, "Get success!", matches)
    }
    catch (e) {
        next(e);
    }
}

export default async function getMatchId (req, res, next){
    try {
        const {id} = req.params;
        const match = await GetById(id);
        successRes(res, 200, "Get success!", match)
    }
    catch (e) {
        next(e);
    }
}

export default async function postMatch (req, res, next) {
    try {
        const {round, nextMatchId, teamId1, teamId2, tournoiId, Date} = req.body;
        const goals = 0;
        const teams = [ {id: teamId1, goals}, {id: teamId2, goals} ];
        const match = await add(round, nextMatchId, teamId1, teamId2, tournoiId, Date);
        successRes(res, 201, "Match created successfully!", match)
    } catch (e) {
        next(e);
    }
}

export default async function addGoal (req, res, next) {
    try {
        const {id} = req.params;
        const { teamId } = req.body;
        const match = await addGoal(id, teamId);
        successRes(res, 200, "Goal added successfully!", match)
    } catch (e) {
        next(e);
    }
}

export default async function finishMatch (req, res, next) {
    try {
        const {id} = req.params;
        const {winnerId} = req.body;
        const match = await addWinner(id, winnerId);
        successRes(res, 200, "Update success!", match)
    } catch (e) {
        next(e);
    }
}

export default async function startMatch (req, res, next) {
    try {
        const {id} = req.params;
        const match = await start(id);
        successRes(res, 200, "Match started successfully!", match)
    } catch (e) {
        next(e);
    }
}
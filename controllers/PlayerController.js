import successRes from "../utils/Respond.js";
import {GetAll, GetById, Update} from "../services/PlayerService.js";

const getPlayers = async (req, res, next) => {
    try {
        const players = await GetAll();
        successRes(res, 200, "Get success!", players)
    }
    catch (e) {
        next(e);
    }
}

const getPlayerId = async (req, res, next) => {
    try {
        const {id} = req.params;
        const player = await GetById(id);
        successRes(res, 200, "Get success!", player)
    }
    catch (e) {
        next(e);
    }
}

const addToTeam = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {teamId} = req.body;
        const playerUpdat = await Update(id, teamId);
        successRes(res, 200, "Update success!", playerUpdat)
    }
    catch (e) {
        next(e);
    }
}
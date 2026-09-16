import successRes from "../utils/Respond.js";
import {GetAll, GetById, Update, quit, getProfile} from "../services/player.service.js";

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
        const playerId = req.user._id;
        const { teamId } = req.body;
        const playerUpdat = await Update(playerId, teamId);
        successRes(res, 200, "Update success!", playerUpdat)
    }
    catch (e) {
        next(e);
    }
}

const quitTeam = async (req, res, next) => {
    try {
        const playerId = req.user._id;
        const player = await quit(playerId);
        successRes(res, 200, "Left team successfully!", player);
    }
    catch (e) {
        next(e);
    }
}

const getPlayerProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const profile = await getProfile(id);
        successRes(res, 200, "Get success!", profile);
    }
    catch (e) {
        next(e);
    }
}

export { getPlayers, getPlayerId, addToTeam, quitTeam, getPlayerProfile };
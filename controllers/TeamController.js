import { GetAll, GetOpen, GetFull, GetById, add } from "../services/teamService.js";
import successRes from '../utils/Respond.js';

const getAllTeams = async (req, res, next) => {
    try {
        const teams = await GetAll();
        successRes(res, 200, "Get success!", teams)
    }
    catch (e) {
        next(e);
    }
}

const getOpenTeams = async (req, res, next) => {
    try {
        const teams = await GetOpen();
        successRes(res, 200, "Get success!", teams)
    }
    catch (e) {
        next(e);
    }
}

const getFullTeams = async (req, res, next) => {
    try {
        const teams = await GetFull();
        successRes(res, 200, "Get success!", teams)
    }
    catch (e) {
        next(e);
    }
}

const getTeamId = async (req, res, next) => {
    try {
        const {id} = req.params;
        const team = await GetById(id);
        successRes(res, 200, "Get success!", team)
    }
    catch (e) {
        next(e);
    }
}

const postTeam = async (req, res, next) => {
    try {
        const { name } = req.body;
        const {id} = req.params;
        const newTeam = await add({ name, leaderId: id });
        successRes(res, 201, "Team created succefully!", newTeam);
    } catch (e) {
        next(e);
    }
}

export { getAllTeams, getOpenTeams, getFullTeams, getTeamId, postTeam };
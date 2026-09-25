import { GetAll, GetOpen, GetFull, GetById, add, getProfile } from "../services/team.service.js";
import successRes from '../utils/Respond.js';

const getAllTeams = async (req, res, next) => {
    try {
        const teams = await GetAll(req.pagination.page);
        successRes(res, 200, "Get success!", teams)
    }
    catch (e) {
        next(e);
    }
}

const getOpenTeams = async (req, res, next) => {
    try {
        const teams = await GetOpen(req.pagination.page);
        successRes(res, 200, "Get success!", teams)
    }
    catch (e) {
        next(e);
    }
}

const getFullTeams = async (req, res, next) => {
    try {
        const teams = await GetFull(req.pagination.page);
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
        const leaderId = req.user._id;
        const newTeam = await add({ name, leaderId });
        successRes(res, 201, "Team created successfully!", newTeam);
    } catch (e) {
        next(e);
    }
}

const getTeamProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const profile = await getProfile(id);
        successRes(res, 200, "Get success!", profile);
    }
    catch (e) {
        next(e);
    }
}

export { getAllTeams, getOpenTeams, getFullTeams, getTeamId, postTeam, getTeamProfile };
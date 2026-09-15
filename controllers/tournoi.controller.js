import successRes from "../utils/Respond.js";
import { GetAll, GetByIdTournoi, generateMatches, close } from "../services/tournoi.service.js";

const getAllTournois = async (req, res, next) => {
    try {
        const tournois = await GetAll();
        successRes(res, 200, "Get success!", tournois)
    }
    catch (e) {
        next(e);
    }
}

const getTournoiById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tournoi = await GetByIdTournoi(id);
        successRes(res, 200, "Get success!", tournoi)
    }
    catch (e) {
        next(e);
    }
}

const addTournoi = async (req, res, next) => {
    try {
        const { name, prizeId, teamIds } = req.body;
        const tournoi = await add(name, prizeId, teamIds);
        const matches = await generateMatches(tournoi._id, teamIds);
        successRes(res, 201, "Tournoi created successfully!", {tournoi, matches});
    }
    catch (e) {
        next(e);
    }
}

const closeTournoi = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tournoi = await close(id);
        successRes(res, 200, "Tournoi closed successfully!", tournoi);
    }
    catch (e) {
        next(e);
    }
}

export { getAllTournois, getTournoiById, closeTournoi, addTournoi };
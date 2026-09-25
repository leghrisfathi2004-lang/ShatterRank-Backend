import successRes from "../utils/Respond.js";
import { GetAll, GetById, Add, Update } from "../services/giftcard.service.js";

const getAllGiftCards = async (req, res, next) => {
    try {
        const giftCards = await GetAll(req.pagination.page);
        successRes(res, 200, "Get success!", giftCards)
    }
    catch (e) {
        next(e);
    }
}

const getGiftCardById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const giftCard = await GetById(id);
        successRes(res, 200, "Get success!", giftCard)
    }
    catch (e) {
        next(e);
    }
}

const addGiftCard = async (req, res, next) => {
    try {
        const { code, provider, value } = req.body;
        const newGC = await Add(code, provider, value);
        successRes(res, 201, "Gift card created succefully!", newGC);
    } catch (e) {
        next(e);
    }
}

const addwinnerGC = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {winnerId} = req.body;
        const updated = await Update(id, winnerId);
        successRes(res, 200, "Gift card updated successfully!", updated);
    } catch(e) {
        next(e);
    }
}

export { getAllGiftCards, getGiftCardById, addGiftCard, addwinnerGC };
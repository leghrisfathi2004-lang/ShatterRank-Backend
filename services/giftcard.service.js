import GiftCard from "../models/Giftcards.js";
import paginate from "../utils/paginate.js";

const GetAll = async (page) => {
    return await paginate(GiftCard, { page });
}

const GetById = async (id) => {
    const giftCard = await GiftCard.findById(id);
    if (!giftCard)
    {
        const er = new Error('Gift Card not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    return giftCard;
}

const Add = async (code, provider, value) => {
    const newGC = new GiftCard({ code, provider, value });
    await newGC.save();
    if (!newGC)
    {
        const er = new Error('Gift Card not created!');
        er.statusCode = 400;
        er.status = 'fail';
        throw er;
    }
    return newGC;
}

const Update = async (id, winnerId) => {
    const updated = await GiftCard.findByIdAndUpdate(id, {winnerId, status: 'assigned'}, {new: true, runValidators: true});
    if (!updated)
    {
        const er = new Error('Gift Card not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    return updated;
}

export { GetAll, GetById, Add, Update };
import express from "express";

import { getAllGiftCards, getGiftCardById, addGiftCard, addwinnerGC } from "../controllers/giftcard.controller";
import {addGCValidator, assignGCValidator} from "../middleware/validators/giftcard.validator"
import { validate } from "../middleware/validate";

const GCRoute = express.Router();

GCRoute.get('/giftcards', getAllGiftCards);
GCRoute.get('/giftcards/:id', getGiftCardById);
GCRoute.post('/giftcards/new', addGCValidator, validate, addGiftCard);
GCRoute.put('/giftcards/:id/assign', assignGCValidator, validate, addwinnerGC);

export default GCRoute;
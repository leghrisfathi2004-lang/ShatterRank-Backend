import express from "express";

import { getAllGiftCards, getGiftCardById, addGiftCard, addwinnerGC } from "../controllers/giftcard.controller.js";
import {addGCValidator, assignGCValidator} from "../middleware/validators/giftcard.validator.js"
import { validate } from "../middleware/validate.js";
import { authenticate, requireRole } from "../middleware/authenticate.js";

const GCRoute = express.Router();
const admin = [authenticate, requireRole('admin')];

GCRoute.get('/giftcards', admin, getAllGiftCards);
GCRoute.get('/giftcards/:id', admin, getGiftCardById);
GCRoute.post('/giftcards/new', admin, addGCValidator, validate, addGiftCard);
GCRoute.put('/giftcards/:id/assign', admin, assignGCValidator, validate, addwinnerGC);

export default GCRoute;
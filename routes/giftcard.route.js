import express from "express";

import { getAllGiftCards, getGiftCardById, addGiftCard, addwinnerGC } from "../controllers/giftcard.controller.js";
import {addGCValidator, assignGCValidator} from "../middleware/validators/giftcard.validator.js"
import { validate } from "../middleware/validate.js";
import { authenticate, requireRole } from "../middleware/authenticate.js";
import { pagination } from "../middleware/pagination.js";

const GCRoute = express.Router();
const admin = requireRole('admin');

GCRoute.use(authenticate);
GCRoute.use(admin);

GCRoute.get('/giftcards', pagination, getAllGiftCards);
GCRoute.get('/giftcards/:id', getGiftCardById);
GCRoute.post('/giftcards/new', addGCValidator, validate, addGiftCard);
GCRoute.put('/giftcards/:id/assign', assignGCValidator, validate, addwinnerGC);

export default GCRoute;
// models/GiftCards.js
import mongoose from "mongoose";

const giftCardsSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  provider: { type: String, required: true },
  value: { type: String, required: true },
  status: { type: String, enum: ['unassigned', 'redeemed'], default: 'unassigned' },
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null }
});

const GiftCard = mongoose.model('GiftCards', giftCardsSchema);

export default GiftCard;
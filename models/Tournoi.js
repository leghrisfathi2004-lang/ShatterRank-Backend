import mongoose from "mongoose";

const tournoiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prize: { type: mongoose.Schema.Types.ObjectId, ref: 'GiftCards', default: null },
  status: { type: String, enum: ['progress', 'complete'], default: 'progress' },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
});

const Tournoi = mongoose.model('Tournoi', tournoiSchema);

export default Tournoi;
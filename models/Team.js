import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
    Trophies: [{ type: String, default: [] }],
    players: { type: Number, default: 0 },
    status: { type: String, enum: ['open', 'full'], default: 'open' },
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
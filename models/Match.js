import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    status: {type: String, enum: ['scheduled', 'live', 'completed'], default: 'scheduled'},
    round: {type: Number, default: null},
    nextMatchId: {type: mongoose.Schema.Types.ObjectId, ref: 'Match', default: null },
    teams: [{
        teamId: {type: mongoose.Schema.ObjectId, ref: 'Team'},
        goals: {type: Number, default: 0}
    }],
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null},
    tournoiId: {type: mongoose.Schema.ObjectId, ref: 'Tournoi', default: null},
    Date: {type: Date, default: Date.now}
});

const Match = mongoose.model('Match', matchSchema);

export default Match;
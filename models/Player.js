import mongoose from 'mongoose';

const playerSchem = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    score: {type: Number, default: 0},
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null}
});

const Player = mongoose.model('Player', playerSchem);

export default Player;
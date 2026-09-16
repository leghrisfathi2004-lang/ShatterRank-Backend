import Tournoi from '../models/Tournoi.js';
import Match from '../models/Match.js';
import { createTournoiMatch } from './match.service.js';

const GetAll = async () => {
    return await Tournoi.find().populate('prize').populate('teams');
}

const GetByIdTournoi = async (id) => {
    const tournoi = await Tournoi.findById(id).populate('prize').populate('teams');
    if (!tournoi) {
        const er = new Error('Tournoi not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    return tournoi;
}

const checkNbr = (nbr) => {
    if (nbr < 2) return true;
    
    let t = nbr;
    while (t > 1) {
        if (t % 2 !== 0) return true;
        t /= 2;
    }
    return false;
};

const shuffle = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
};

const generateMatches = async (tournoiId, teamIds) => {
    const teams = shuffle(teamIds);
    const nbr = teams.length;

    if (checkNbr(nbr)) {
        const er = new Error('Number of teams must be a power of 2!');
        er.statusCode = 400;
        er.status = 'fail';
        throw er;
    }

    const Rounds = Math.log2(nbr);
    const matches = [];
    let nextMatchIds = [];

    for (let r = Rounds; r >= 1; r--) {
        const matchesInRound = nbr / Math.pow(2, r);
        const roundMatches = [];
        
        for (let i = 0; i < matchesInRound; i++) {
            const isFinal = (r == Rounds ? true : false);
            const isFirstRound = (r == 1 ? true : false);

            const nextMatchId = isFinal ? null : nextMatchIds[Math.floor(i / 2)];

            const [teamId1, teamId2] = isFirstRound ? [teams[i * 2], teams[i * 2 + 1]] : [null, null];

            const match = await createTournoiMatch({ round: r, nextMatchId, teamId1, teamId2, tournoiId });

            roundMatches.push(match._id);
            matches.push(match);
        }

        nextMatchIds = roundMatches;
    }
    return matches;
}

const add = async (name, prizeId, teamIds) => {
    const tournoi = new Tournoi({name, prize: prizeId, teams: teamIds});
    await tournoi.save();
    return tournoi;
}

const getProfile = async (id) => {
    const tournoi = await Tournoi.findById(id)
        .populate('prize', 'provider value status')
        .populate('teams', 'name status Trophies players');
    if (!tournoi) {
        const er = new Error('Tournoi not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    const matches = await Match.find({ tournoiId: tournoi._id })
        .populate('teams.teamId', 'name')
        .populate('winnerId', 'name')
        .sort({ round: -1 });
    return { tournoi, matches };
}

const close = async (id) => {
    const tournoi = await GetByIdTournoi(id);
    tournoi.status = 'complete';
    await tournoi.save();
    return tournoi;
}

export { GetAll, GetByIdTournoi, generateMatches, close, add, getProfile };
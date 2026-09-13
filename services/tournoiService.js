import Tournoi from '../models/Tournoi.js';
import { add } from './matchService.js';

const GetAll = async () => {
    return await Tournoi.find().populate('prize').populate('teams');
}

const GetById = async (id) => {
    const tournoi = await Tournoi.findById(id).populate('prize').populate('teams');
    if (!tournoi) {
        const er = new Error('Tournoi not found!');
        er.statuscode = 404;
        er.status = 'fail';
        throw er;
    }
    return tournoi;
}

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const generateMatches = async (tournoiId, teamIds) => {
    const teams = shuffle(teamIds);
    const nbr = teams.length;

    if (nbr < 2 || ((nbr & (nbr - 1)) !== 0)) {
        const er = new Error('Number of teams must be a power of 2!');
        er.statuscode = 400;
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

            const match = await add(r, nextMatchId, teamId1, teamId2, tournoiId);

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

const close = async (id) => {
    const tournoi = await GetById(id);
    if (!tournoi) {
        const er = new Error('Tournoi not found!');
        er.statuscode = 404;
        er.status = 'fail';
        throw er;
    }
    tournoi.status = 'complete';
    await tournoi.save();
    return tournoi;
}

export { GetAll, GetById, generateMatches, close };
import Match from '../models/Match.js';
import {Update} from './giftcard.service.js'
import {addTrophy} from './team.service.js'
import {GetByIdTournoi} from './tournoi.service.js'

const GetAll = async () => {
    const matches = await Match.find();
    return matches;
}

const GetById = async (id) => {
    const match = await Match.findById(id);
    if (!match)
    {
        const er = new Error('Match not found!');
        er.statuscode = 404;
        er.status = 'fail';
        throw er;
    }
    return match;
}

const start = async (id) => {
    const match = await GetById(id);
    match.status = 'live';
    await match.save();
    return match;
}

const addGoal = async (id, teamId) => {
    const match = await GetById(id);

    const teamIndex = match.teams.findIndex(team => team.teamId === teamId);
    if (teamIndex === -1 || match.status !== 'live') {
        const er = new Error('Team not found in this match or match not live!');
        er.statuscode = 404;
        er.status = 'fail';
        throw er;
    }

    match.teams[teamIndex].goals += 1;
    await match.save();
    return match;
}

const add = async (round, nextMatchId, teamId1, teamId2, tournoiId) => {

    const teams = [ {teamId: teamId1}, {teamId: teamId2} ];
    const match = new Match({round, nextMatchId, teams, tournoiId});
    await match.save();
    return match;
}

const addWinner = async (id, winnerId) => {
    const match = await GetById(id);
    match.winnerId = winnerId;
    match.status = 'completed';
    if (match.nextMatchId) 
        await setNext(match.nextMatchId, winnerId);
    if (!match.nextMatchId && match.tournoiId)
        await setPrize(match.tournoiId, winnerId);
    await match.save();
    return match;
}

const setPrize = async (tournoiId, winnerId) => {
    const tournoi = await GetByIdTournoi(tournoiId);
    if(tournoi.prize)
        await Update(tournoi.prize._id, winnerId);
    await addTrophy(winnerId, tournoi.name);
}

const setNext = async (matchId, teamId) => {
    const match = await GetById(matchId);
    if (match.teams.length >= 2) {
        const er = new Error('Match already has two teams!');
        er.statuscode = 400;
        er.status = 'fail';
        throw er;
    }
    match.teams.push({ teamId, goals: 0 });
    await match.save();
    return match;
}

export { GetAll, GetById, addGoal, add, addWinner, setNext, start };
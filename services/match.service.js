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
        er.statusCode = 404;
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

    const teamIndex = match.teams.findIndex(team => team.teamId && team.teamId.equals(teamId));
    if (teamIndex === -1 || match.status !== 'live') {
        const er = new Error('Team not found in this match or match not live!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }

    match.teams[teamIndex].goals += 1;
    await match.save();
    return match;
}

const add = async ({ teamId1, teamId2, round = null, nextMatchId = null, tournoiId = null, Date }) => {
    const teams = [ {teamId: teamId1}, {teamId: teamId2} ];
    const doc = { round, nextMatchId, teams, tournoiId };
    if (Date !== undefined) doc.Date = Date;
    const match = new Match(doc);
    await match.save();
    return match;
}

const createFriendly = ({ teamId1, teamId2, Date }) =>
    add({ teamId1, teamId2, Date });

const createTournoiMatch = ({ teamId1, teamId2, round, nextMatchId, tournoiId, Date }) =>
    add({ teamId1, teamId2, round, nextMatchId, tournoiId, Date });

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

const getProfile = async (id) => {
    const match = await Match.findById(id)
        .populate('teams.teamId', 'name Trophies')
        .populate('winnerId', 'name')
        .populate('tournoiId', 'name status')
        .populate('nextMatchId', 'round status');
    if (!match) {
        const er = new Error('Match not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    return match;
}

const setNext = async (matchId, teamId) => {
    const match = await GetById(matchId);
    const emptyIndex = match.teams.findIndex(team => !team.teamId);
    if (emptyIndex === -1) {
        const er = new Error('Match already has two teams!');
        er.statusCode = 400;
        er.status = 'fail';
        throw er;
    }
    match.teams[emptyIndex].teamId = teamId;
    await match.save();
    return match;
}

export { GetAll, GetById, addGoal, add, createFriendly, createTournoiMatch, addWinner, setNext, start, getProfile };
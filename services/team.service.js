import Team from "../models/Team.js";
import Player from "../models/Player.js";
import GiftCard from "../models/Giftcards.js";

const getPlayerTeamStatus = async (playerId) => {
    const asLeader = await Team.findOne({ leaderId: playerId });
    if (asLeader) return { inTeam: true, role: 'leader', team: asLeader };
    const player = await Player.findById(playerId);
    if (player && player.teamId) return { inTeam: true, role: 'member', teamId: player.teamId };
    return { inTeam: false };
};

const ensurePlayerHasNoTeam = async (playerId) => {
    const status = await getPlayerTeamStatus(playerId);
    if (status.inTeam) {
        const er = new Error(`Player is already ${status.role} of a team!`);
        er.statusCode = 400;
        er.status = 'fail';
        throw er;
    }
};

const GetAll = async () => {
    const teams = await Team.find();
    return teams;
}

const GetOpen = async () => {
    const teams = await Team.find({ status: 'open' });
    return teams;
}

const GetFull = async () => {
    const teams = await Team.find({ status: 'full' });
    return teams;
}

const GetById = async (id) => {
    const team = await Team.findById(id);
    if (!team)
    {
        const er = new Error('Team not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    return team;
}

const removePlayer = async (id) => {
    const team = await Team.findById(id);
    if (!team) {
        const er = new Error('Team not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    if (team.players > 0) team.players -= 1;
    if (team.status === 'full' && team.players < 11) team.status = 'open';
    await team.save();
    return team;
}

const addPlayer = async (id) => {
    const team = await Team.findById(id);
    if (!team)
    {
        const er = new Error('Team not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    if (team.players >= 11) {
        team.status = 'full';
        await team.save();
        return team;
    }
    team.players += 1;
    if (team.players >= 11) {
        team.status = 'full';
    }
    await team.save();
    return team;
}

const add = async ({ name, leaderId }) => {
    await ensurePlayerHasNoTeam(leaderId);
    const newTeam = new Team({ name, leaderId });
    await newTeam.save();
    return newTeam;
}

const getProfile = async (id) => {
    const team = await Team.findById(id).populate('leaderId', 'name score');
    if (!team) {
        const er = new Error('Team not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    const members = await Player.find({ teamId: team._id }).select('name score');
    const giftcards = await GiftCard.find({ winnerId: team._id }).select('provider value status');
    return {
        _id: team._id,
        name: team.name,
        status: team.status,
        players: team.players,
        leader: team.leaderId,
        members,
        trophies: team.Trophies,
        giftcards,
    };
}

const addTrophy = async (id, trophy) => {
    const team = await GetById(id);
    team.Trophies.push(trophy);
    await team.save();
}

export { GetAll, GetOpen, GetFull, GetById, addPlayer, removePlayer, add, addTrophy, getPlayerTeamStatus, ensurePlayerHasNoTeam, getProfile };
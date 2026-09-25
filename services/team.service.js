import Team from "../models/Team.js";
import Player from "../models/Player.js";
import GiftCard from "../models/Giftcards.js";
import paginate from "../utils/paginate.js";

const inTeam = async (playerId) => {
    const player = await Player.findById(playerId);
    if (player && player.teamId){
        const er = new Error(`Player is already in a team!`);
        er.statusCode = 400;
        er.status = 'fail';
        throw er;
    }
};

const GetAll = async (page) => {
    return await paginate(Team, { page });
}

const GetOpen = async (page) => {
    return await paginate(Team, { page, filter: { status: 'open' } });
}

const GetFull = async (page) => {
    return await paginate(Team, { page, filter: { status: 'full' } });
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
    const team = await GetById(id);
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
        if (team.status !== 'full') {
            team.status = 'full';
            await team.save();
        }
        const er = new Error('Team is full!');
        er.statusCode = 400;
        er.status = 'fail';
        throw er;
    }
    team.players += 1;
    if (team.players >= 11) team.status = 'full';
    await team.save();
    return team;
}

const add = async ({ name, leaderId }) => {
    await inTeam(leaderId);
    const newTeam = new Team({ name, leaderId, players: 1 });
    await newTeam.save();
    await Player.findByIdAndUpdate(leaderId, { teamId: newTeam._id });
    return newTeam;
}

const isLeader = async (playerId) => {
    return !!(await Team.findOne({ leaderId: playerId }));
}

const getProfile = async (id) => {
    const team = await Team.findById(id).populate('leaderId', 'name score');
    if (!team) {
        const er = new Error('Team not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    const members = await Player.find({ teamId: team._id, _id: { $ne: team.leaderId._id } }).select('name score');
    const giftcards = await GiftCard.find({ winnerId: team._id }).select('provider value');
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

export { GetAll, GetOpen, GetFull, GetById, addPlayer, removePlayer, add, addTrophy, getProfile, inTeam, isLeader };
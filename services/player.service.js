import Player from "../models/Player.js";
import {addPlayer, removePlayer, inTeam, isLeader} from "./team.service.js";
import paginate from "../utils/paginate.js";

export async function GetAll(page) {
    return await paginate(Player, {
        page,
        select: 'name score teamId',
        populate: { path: 'teamId', select: 'name' },
    });
}

export async function getLeaderboard(page) {
    return await paginate(Player, { page, sort: { score: -1 }, select: 'name score' });
}

export async function GetById(id) {
    const player = await Player.findById(id)
        .select('name score teamId')
        .populate('teamId', 'name status players Trophies leaderId');
    if (!player) {
        const er = new Error('Player not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    return player;
}

export async function getMe(id) {
    const player = await Player.findById(id)
        .select('-password')
        .populate('teamId', 'name status players Trophies leaderId');
    if (!player) {
        const er = new Error('Player not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    return player;
}

export async function Update(id, teamId) {
    const player = await Player.findById(id);
    if (!player) {
        const er = new Error('Player not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    await inTeam(id);
    await addPlayer(teamId);
    const playerUpdat = await Player.findByIdAndUpdate(id, { teamId }, { new: true });

    return playerUpdat;
}

export async function addScore(playerId) {
    const player = await Player.findByIdAndUpdate(
        playerId,
        { $inc: { score: 5 } },
        { new: true }
    );
    if (!player) {
        const er = new Error('Player not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    return player;
}

export async function quit(playerId) {
    const player = await Player.findById(playerId);
    if (!player) {
        const er = new Error('Player not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    if (!player.teamId) {
        const er = new Error('Player is not in a team!');
        er.statusCode = 400;
        er.status = 'fail';
        throw er;
    }
    if (await isLeader(playerId)) {
        const er = new Error('Leader cannot quit their own team!');
        er.statusCode = 400;
        er.status = 'fail';
        throw er;
    }
    await removePlayer(player.teamId);
    player.teamId = null;
    await player.save();
    return player;
}
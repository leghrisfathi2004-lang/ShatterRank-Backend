import Player from "../models/Player.js";
import {addPlayer, removePlayer, ensurePlayerHasNoTeam} from "./team.service.js";

export async function GetAll() {
    const players = await Player.find();
    return players;
}

export async function GetById(id) {
    const player = await Player.findById(id);
    if (!player)
    {
        const er = new Error('Player not found!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    return player;
}

export async function getProfile(id) {
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
    await ensurePlayerHasNoTeam(id);
    await addPlayer(teamId);
    const playerUpdat = await Player.findByIdAndUpdate(id, { teamId }, { new: true });

    return playerUpdat;
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
    await removePlayer(player.teamId);
    player.teamId = null;
    await player.save();
    return player;
}
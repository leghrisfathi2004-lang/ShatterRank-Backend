import Player from "../models/Player.js";
import {GetById, addPlayer} from "./teamService.js";

export async function GetAll() {
    const players = await Player.find();
    return players;
}

export async function GetById(id) {
    const player = await Player.findById(id);
    if (!player)
    {
        const er = new Error('Player not found!');
        er.statuscode = 404;
        er.status = 'fail';
        throw er;
    }
    return player;
}

export async function Update(id, teamId) {
    const player = await Player.findById(id);
    if (!player)
        {
            const er = new Error('Player not found!');
            er.statuscode = 404;
            er.status = 'fail';
            throw er;
    }
    if (player.teamId) {
        const er = new Error('Player is already in a team!');
        er.statuscode = 400;
        er.status = 'fail';
        throw er;
    }
    await addPlayer(teamId);
    const playerUpdat = await Player.findByIdAndUpdate(id, { teamId }, { new: true });

    return playerUpdat;
}
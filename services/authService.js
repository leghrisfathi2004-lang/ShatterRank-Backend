import Player from "../models/Player.js";
import bcrypt from "bcryptjs";

export async function add ({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPlayer = new Player({ name, email, password: hashedPassword });
    await newPlayer.save();
    if (!newPlayer)
        {
            const er = new Error('Player not created!');
            er.statuscode = 400;
            er.status = 'fail';
            throw er;
        }
    return newPlayer;
}

export async function check({ email, password }) {
    const player = await Player.findOne({ email });
    if (!player) {
        const er = new Error('Email incorrect!');
        er.statuscode = 404;
        er.status = 'fail';
        throw er;
    }
    const isMatch = await bcrypt.compare(password, player.password);
    if (!isMatch) {
        const er = new Error('Invalid password!');
        er.statuscode = 401;
        er.status = 'fail';
        throw er;
    }
    return player;
}

import Player from "../models/Player.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

const toSafePlayer = (player) => {
    const obj = player.toObject();
    delete obj.password;
    return obj;
};

export async function add ({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPlayer = new Player({ name, email, password: hashedPassword });
    await newPlayer.save();
    const token = generateToken({ id: newPlayer._id, role: newPlayer.role });
    return { player: toSafePlayer(newPlayer), token };
}

export async function check({ email, password }) {
    const player = await Player.findOne({ email });
    if (!player) {
        const er = new Error('Email incorrect!');
        er.statusCode = 404;
        er.status = 'fail';
        throw er;
    }
    const isMatch = await bcrypt.compare(password, player.password);
    if (!isMatch) {
        const er = new Error('Invalid password!');
        er.statusCode = 401;
        er.status = 'fail';
        throw er;
    }
    const token = generateToken({ id: player._id, role: player.role });
    return { player: toSafePlayer(player), token };
}

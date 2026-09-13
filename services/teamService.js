import Team from "../models/Team.js";

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
        er.statuscode = 404;
        er.status = 'fail';
        throw er;
    }
    return team;
}

const addPlayer = async (id) => {
    const team = await Team.findById(id);
    if (!team)
    {
        const er = new Error('Team not found!');
        er.statuscode = 404;
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
    const alreadyLeader = await Team.findOne({ leaderId: leaderId });
    if (alreadyLeader) {
        const er = new Error('Player is already a leader of another team!');
        er.statuscode = 400;
        er.status = 'fail';
        throw er;
    }
    const newTeam = new Team({ name, leaderId });
    await newTeam.save();
    if (!newTeam)
        {
            const er = new Error('Team not created!');
            er.statuscode = 400;
            er.status = 'fail';
            throw er;
        }
    return newTeam;
}

export { GetAll, GetOpen, GetFull, GetById, addPlayer, add };
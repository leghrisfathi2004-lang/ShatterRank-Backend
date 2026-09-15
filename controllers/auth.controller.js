import successRes from "../utils/Respond.js";
import {add, check} from "../services/auth.service.js";
 
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newPlayer = await add({ name, email, password });
        successRes(res, 201, "Player created succefully!", newPlayer);
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const player = await check({ email, password });
        successRes(res, 200, "Login success!", player);
    } catch (e) {
        next(e);
    }
}

export { register, login };
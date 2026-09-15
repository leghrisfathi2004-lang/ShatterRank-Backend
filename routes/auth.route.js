import express from "express";

import { register, login } from "../controllers/authController.js";
import { registerValidator, loginValidator} from "../middleware/validators/auth.validator.js";
import {validate} from "../middleware/validate.js"

const authRoute = express.Router();

authRoute.post('/register', registerValidator, validate, register);
authRoute.post('/login', loginValidator, validate, login);

export default authRoute;
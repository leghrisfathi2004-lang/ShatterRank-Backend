import { verifyToken } from "../utils/jwt.js";
import Player from "../models/Player.js";

export const authenticate = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return next({ statusCode: 401, status: "fail", message: "Authentication required" });
        }
        const token = header.slice(7);
        const payload = verifyToken(token);
        const user = await Player.findById(payload.id).select("-password");
        if (!user) {
            return next({ statusCode: 401, status: "fail", message: "User not found" });
        }
        req.user = user;
        next();
    } catch (e) {
        next({ statusCode: 401, status: "fail", message: "Invalid or expired token" });
    }
};

export const requireRole = (role) => (req, res, next) => {
    if (!req.user || req.user.role !== role) {
        return next({ statusCode: 403, status: "fail", message: "Forbidden" });
    }
    next();
};

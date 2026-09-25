import bcrypt from "bcryptjs";
import Player from "../models/Player.js";

export default async function seedAdmin() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
        console.warn("Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD not set");
        return;
    }
    const existing = await Player.findOne({ email });
    if (existing) {
        if (existing.role !== "admin") {
            existing.role = "admin";
            await existing.save();
            console.log(`Admin promoted: ${email}`);
        }
        return;
    }
    const hashed = await bcrypt.hash(password, 10);
    await Player.create({
        name: "Admin",
        email,
        password: hashed,
        role: "admin",
    });
    console.log(`Admin seeded: ${email}`);
}

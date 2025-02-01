import { db } from "@/server/db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 4);
};

export const createJWT = (user: any) => {
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
    );
    return token;
};

export const protect = async (jwt_string: string) => {
    const { id, username } = jwt.verify(jwt_string, process.env.JWT_SECRET);
    const user = await db.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }
    return user;
}
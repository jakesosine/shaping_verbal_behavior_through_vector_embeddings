import { db } from "@/server/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 4);
};

export const createJWT = (user: User) => {
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || "this is a secret little message that makes things messed up"
    );
    return token;
};

export const protect = async (jwt_string: string) => {
    const decoded = jwt.verify(jwt_string, process.env.JWT_SECRET || "this is a secret little message that makes things messed up") as { id: number };
    const user = await db.user.findUnique({
        where: {
            id: decoded.id,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }
    return decoded.id;
}
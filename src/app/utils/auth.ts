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

export const protect = async (req: Request) => {
    const bearer = req.headers.get("jwt");
    if (!bearer) {
        return new Response("Not authorized", { status: 401 });
    }

    const [, token] = bearer.split(" ");
    if (!token) {
        return new Response("Not authorized", { status: 401 });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    } catch (e) {
        console.error(e);
        return new Response("Not authorized", { status: 401 });
    }
};

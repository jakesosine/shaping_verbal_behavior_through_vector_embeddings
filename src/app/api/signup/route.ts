'use server'
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { comparePasswords, hashPassword, createJWT } from '@/app/utils/auth';
export async function POST(req: NextRequest) {
    const { email, password, alphaKey } = await req.json();
    // Check if both email and password are provided
    if (!email || !password || !alphaKey) {
        return NextResponse.json({ status: 400, message: "Email or password not provided" });
    }
    if (alphaKey !== process.env.ALPHA_KEY) {
        return NextResponse.json({ status: 401, message: "Not Authorized. Please Request Alpha Key" });
    }

    // Check if the email already exists
    const existingUser = await db.user.findUnique({
        where: {
            username: email,
        },
    });

    if (existingUser) {
        return NextResponse.json({ status: 409, message: "Try a different email" });
    }
    // Proceed to create new user with hashed password
    const hashedPassword = await hashPassword(password);
    const user = await db.user.create({
        data: {
            username: email,
            password: hashedPassword,
        },
    });

    // Generate JWT for the user
    const token = createJWT(user);
    return NextResponse.json({
        user: {
            hasBackground: false
        },
        token: token,
    });
}



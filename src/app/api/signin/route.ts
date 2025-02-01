'use server'
import { db } from '@/server/db';
import { NextRequest, NextResponse } from 'next/server';
import { comparePasswords, createJWT } from '@/app/utils/auth';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    const user = await db.user.findUnique({
        where: {
            username: email,
        },
    });
    if (!user) {
        return NextResponse.json({ message: "User not found" });
    }

    const isValid = await comparePasswords(password, user.password);

    if (!isValid) {
        return NextResponse.json({ message: "Invalid credentials" });
    }
    const token = createJWT(user);
    return NextResponse.json({
        user: {
            hasBackground: user.hasBackground,
        },
        token: token,
    });
};

'use server'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { email, password, alphaKey, termsAccepted } = await req.json();
    console.log(email, password, alphaKey, termsAccepted);
    return NextResponse.json({ message: "Sign in successful" });
}



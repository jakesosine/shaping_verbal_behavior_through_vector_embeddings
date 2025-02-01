"use server";
import { db } from "@/server/db";
import { protect } from "@/app/utils/auth";
import { NextResponse, NextRequest } from "next/server";

export const submitConsent = async (jwt: string) => {
    const user = await protect(jwt);
    console.log(user);
    return user;
}

export const submitNonConsent = async (jwt: string) => {
    const user = await protect(jwt);
    console.log(user);
    return user;
}
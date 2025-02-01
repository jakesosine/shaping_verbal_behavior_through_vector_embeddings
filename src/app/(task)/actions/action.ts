"use server";
import { db } from "@/server/db";
import { protect } from "@/app/utils/auth";
import { NextResponse, NextRequest } from "next/server";

export const submitConsent = async (jwt: string) => {
    const user = await protect(jwt);
    const { consent } = await db.user.update({
        where: {
            id: user.id,
        },
        data: {
            consent: true,
        },
    });
    return consent;
}

export const submitNonConsent = async (jwt: string) => {
    const user = await protect(jwt);
    const { consent } = await db.user.update({
        where: {
            id: user.id,
        },
        data: {
            consent: false,
        },
    });
    return consent;
}
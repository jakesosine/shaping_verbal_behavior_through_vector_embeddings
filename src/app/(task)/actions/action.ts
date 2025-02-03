"use server";
import { db } from "@/server/db";
import { protect } from "@/app/utils/auth";

type BackgroundFormData = {
    gender: string;
    race: string;
    agerange: string;
    highested: string;
};

export const backgroundInfo = async (formData: BackgroundFormData, jwt: string) => {
    const { gender, race, agerange, highested } = formData;
    const id = await protect(jwt);
    await db.backgroundInfo.create({
        data: {
            gender,
            race,
            agerange,
            highested,
            userId: id,
        },
    });

    const { hasBackground } = await db.user.update({
        where: { id },
        data: { hasBackground: true }
    });
    console.log(hasBackground);

    return hasBackground;
}

export const submitConsent = async (jwt: string) => {
    const id = await protect(jwt);
    const { consent } = await db.user.update({
        where: {
            id: id,
        },
        data: {
            consent: true,
        },
    });
    return consent;
}

export const submitNonConsent = async (jwt: string) => {
    const id = await protect(jwt);
    const { consent } = await db.user.update({
        where: {
            id: id,
        },
        data: {
            consent: false,
        },
    });
    return consent;
}

export const processTextInput = async (text: string, id: number, jwt: string) => {
    const userId = await protect(jwt);
    console.log(userId);
    return { userId };
}
export const getTask = async (id: number) => {
    const task = await db.task.findUnique({
        where: { id: id },
    });
    return task;
}
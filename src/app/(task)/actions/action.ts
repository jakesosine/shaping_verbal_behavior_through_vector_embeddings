"use server";
import { db } from "@/server/db";
import { protect } from "@/app/utils/auth";
import { OpenAI } from "openai";


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

    const user = await db.user.update({
        where: { id },
        data: { hasBackground: true }
    });
    console.log(user);
    return user;
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

export const processTextInput = async (text: string, id: number, attempt: number, jwt: string) => {
    const userId = await protect(jwt);
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text,
    });
    const embedding = response.data[0]?.embedding;

    const task = await db.task.findUnique({
        where: {
            id: id,
        },
    });

    const taskResponse = await db.taskResponse.create({
        data: {
            userId: userId,
            taskId: id,
            attempt: attempt,
            cosineSimilarity: 0,
            userDescription: text,
            embedding: embedding,
        },
    });
    return { userId, embedding, taskResponse };
}
export const getTask = async (id: number) => {
    const task = await db.task.findUnique({
        where: { id: id },
    });
    return task;
}


export const createTask = async (attempts: number, videoUrl: string, startTime: number, endTime: number, instructions: string, comparisonDescription: string, isActive: boolean) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: comparisonDescription,
    });

    if (!response.data[0]?.embedding) {
        throw new Error("Failed to generate embedding");
    }

    const result = await db.$executeRaw`
        INSERT INTO "Task" (
            "url", 
            "startTime", 
            "endTime", 
            "instructions", 
            "comparisonDescription", 
            "attempts",
            "embedding", 
            "isActive"
        ) VALUES (
            ${videoUrl}, 
            ${startTime}, 
            ${endTime}, 
            ${instructions}, 
            ${comparisonDescription}, 
            ${attempts}, 
            ${response.data[0].embedding}::vector, 
            ${isActive}
        )
    `;



    return result;
}

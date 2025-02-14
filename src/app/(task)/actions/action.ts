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

export const backgroundInfo = async (formData: BackgroundFormData, jwt: string, prolificId: string) => {
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
        data: { hasBackground: true, prolificId }
    });
    return { hasBackground: true };
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

export const processTextInput = async (
    text: string,
    taskId: number,
    attempt: number,
    jwt: string
) => {
    // Validate JWT and retrieve the user ID.
    const userId = await protect(jwt);

    // Generate the embedding from the provided text.
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Remove the type assertion since OpenAI's client handles types internally
    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text,
    });

    const embedding = embeddingResponse.data[0]?.embedding;
    if (!embedding) {
        throw new Error("Failed to generate embedding");
    }

    // Compute the cosine similarity between the provided embedding
    // and the one stored in the Task table.
    const [taskResult] = await db.$queryRaw<[{ cosine_similarity: number }]>`
      SELECT (1 - (embedding <=> ${embedding}::vector)) AS cosine_similarity
      FROM "Task"
      WHERE "id" = ${taskId}
    `;
    if (!taskResult) {
        throw new Error(`Task with id ${taskId} not found`);
    }
    const cosineSimilarity = taskResult.cosine_similarity;

    // Insert a new TaskResponse record, ensuring that all required columns receive a value.
    const result = await db.$queryRaw`
      INSERT INTO "TaskResponse" (
        "userId", "taskId", "attempt", "cosineSimilarity", "userDescription", "embedding"
      ) VALUES (
        ${userId}, ${taskId}, ${attempt}, ${cosineSimilarity}, ${text}, ${embedding}::vector
      ) RETURNING id
    `;
    console.log("result", result);
    if (!result || !Array.isArray(result) || result.length === 0) {
        throw new Error("Failed to create TaskResponse");
    }
    const taskResponseId = result[0].id;
    if (!taskResponseId) {
        throw new Error("TaskResponse did not return a valid id");
    }
    const transformedCosineSimilarity = await transformCosineSimilarity(cosineSimilarity, taskResponseId);
    return { transformedCosineSimilarity };
};

export const createTask = async (attempts: number, videoUrl: string, startTime: number, endTime: number, instructions: string, comparisonDescription: string, isActive: boolean, jwt: string) => {
    const userId = await protect(jwt);
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    if (user.admin === false) {
        throw new Error("User is not an admin");
    }

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

export const getTask = async () => {
    const task = await db.task.findMany({
        where: {
            isActive: true,
        },
    });
    return task;
}

const transformCosineSimilarity = async (cosineSimilarity: number, taskResponseId: number) => {

    console.log("cosine similarity", cosineSimilarity);
    const oneMinusCosineSimilarity = 1 - (cosineSimilarity + 0.00001);
    console.log("oneMinusCosineSimilarity", oneMinusCosineSimilarity);
    const loggedValue = Math.log10(oneMinusCosineSimilarity);
    console.log("loggedValue", loggedValue);

    // absolute value of the output of logged of (1 - cosine similarity) 
    const absoluteValue = Math.abs(loggedValue);
    console.log("absoluteValue", absoluteValue);
    // divide by 2 
    let dividedValue = absoluteValue / 1.1;
    console.log("dividedValue", dividedValue);
    if (dividedValue < 0.55) {
        dividedValue = 0.55;
    }
    if (dividedValue > 1.270854553) {
        dividedValue = 1.270854553;
    }
    const minValue = 0.01;
    const maxValue = 1.270854553;
    const normalizedValue = (dividedValue - minValue) / (maxValue - minValue);
    console.log("normalizedValue", normalizedValue);
    await db.transformedCosineSimilarity.create({
        data: {
            cosineSimilarity: cosineSimilarity,
            oneMinusCosineSimilarity: oneMinusCosineSimilarity,
            loggedValue: loggedValue,
            absoluteValue: absoluteValue,
            dividedValue: dividedValue,
            normalizedValue: normalizedValue,
            taskResponseId: taskResponseId,
        },
    });
    return normalizedValue;
}

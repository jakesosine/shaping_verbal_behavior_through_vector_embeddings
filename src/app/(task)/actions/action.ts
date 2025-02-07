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
// export const processTextInput = async (
//     text: string,
//     taskId: number,
//     attempt: number,
//     jwt: string
// ) => {
//     // Validate JWT and retrieve the user ID.
//     const userId = await protect(jwt);

//     // Generate the embedding from the provided text.
//     const openai = new OpenAI({
//         apiKey: process.env.OPENAI_API_KEY,
//     });
//     const embeddingResponse = await openai.embeddings.create({
//         model: "text-embedding-ada-002",
//         input: text,
//     });
//     const embedding = embeddingResponse.data[0]?.embedding;
//     if (!embedding) {
//         throw new Error("Failed to generate embedding");
//     }

//     // Compute the cosine similarity between the provided embedding
//     // and the one stored in the Task table.
//     const [taskResult] = await db.$queryRaw<[{ cosine_similarity: number }]>`
//     SELECT (embedding <=> ${embedding}::vector) AS cosine_similarity
//     FROM "Task"
//     WHERE "id" = ${taskId}
//   `;
//     if (!taskResult) {
//         throw new Error(`Task with id ${taskId} not found`);
//     }
//     const cosineSimilarity = taskResult.cosine_similarity;

//     // Insert a new TaskResponse record, ensuring that all required columns receive a value.
//     const result = await db.$executeRaw`
//     INSERT INTO "TaskResponse" (
//       "userId", 
//       "taskId", 
//       "attempt", 
//       "cosineSimilarity", 
//       "userDescription",
//       "embedding"
//     ) VALUES (
//       ${userId}, 
//       ${taskId}, 
//       ${attempt}, 
//       ${cosineSimilarity}, 
//       ${text},
//       ${embedding}::vector
//     )
//   `;

//     return result;
// };
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
      SELECT (embedding <=> ${embedding}::vector) AS cosine_similarity
      FROM "Task"
      WHERE "id" = ${taskId}
    `;
    if (!taskResult) {
        throw new Error(`Task with id ${taskId} not found`);
    }
    const cosineSimilarity = taskResult.cosine_similarity;

    // Insert a new TaskResponse record, ensuring that all required columns receive a value.
    const result = await db.$executeRaw`
      INSERT INTO "TaskResponse" (
        "userId", 
        "taskId", 
        "attempt", 
        "cosineSimilarity", 
        "userDescription",
        "embedding"
      ) VALUES (
        ${userId}, 
        ${taskId}, 
        ${attempt}, 
        ${cosineSimilarity}, 
        ${text},
        ${embedding}::vector
      )
    `;

    return result;
};

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

export const getTask = async () => {
    const task = await db.task.findMany({
        where: {
            isActive: true,
        },
    });
    return task;
}
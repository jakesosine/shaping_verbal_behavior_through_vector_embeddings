'use server'
import { db } from "@/server/db";

export default async function GatherTasks() {
    const data = await db.task.findMany();
    return data;
}
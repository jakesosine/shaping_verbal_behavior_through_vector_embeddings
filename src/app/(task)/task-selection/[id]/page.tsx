'use server'
import VideoEmbed from "./videoEmbed";
import { db } from "@/server/db";

export default async function TaskSelectionPage({ params }: { params: { id: string } }) {
    const test = await db.task.findUnique({
        where: { id: parseInt(params.id) },
    });
    console.log(test);
    if (!test) {
        return <div>Task not found</div>;
    }
    return <VideoEmbed videoId={test.url} startTime={test.startTime} endTime={test.endTime} id={parseInt(params.id)} />;
}
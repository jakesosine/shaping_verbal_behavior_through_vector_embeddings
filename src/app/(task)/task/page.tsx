'use server'
import VideoEmbed from "./videoEmbed";
import { getTask } from "@/app/(task)/actions/action";

type taskData = {
    id: number;
    url: string;
    startTime: number;
    endTime: number;
    instructions: string;
    comparisonDescription: string;
    attempts: number;
    isActive: boolean;
}[]

export default async function TaskSelectionPage() {
    const task = await getTask();
    console.log(task);
    if (!task) {
        return <div>Task not found</div>;
    }
    return <VideoEmbed task={task} />;
}

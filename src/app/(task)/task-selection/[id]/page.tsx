'use server'
import VideoEmbed from "./videoEmbed";
import { getTask } from "@/app/(task)/actions/action";

export default async function TaskSelectionPage({ params }: { params: { id: string } }) {
    const taskId = parseInt(params.id);
    const task = await getTask(taskId);
    console.log(task);
    if (!task) {
        return <div>Task not found</div>;
    }
    return <VideoEmbed videoId={task.url} startTime={task.startTime} endTime={task.endTime} id={task.id} />;
}

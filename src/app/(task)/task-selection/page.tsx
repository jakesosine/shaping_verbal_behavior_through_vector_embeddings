'use server'
import GatherTasks from "./gatherTasks";
import TaskSelectionClient from "./taskSelection";

export default async function TaskSelection() {
    const data = await GatherTasks();
    return <TaskSelectionClient data={data} />;
}
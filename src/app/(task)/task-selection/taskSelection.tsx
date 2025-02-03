'use client'

import Link from "next/link";

type TaskSelectionProps = {
    id: number;
    url: string;
    startTime: number;
    endTime: number;
    description: string;
}[]

export default function TaskSelection({ data }: { data: TaskSelectionProps }) {
    return (
        <>


            <div className="text-center mb-8 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Task Instructions
                </h2>
                <h3 className="text-lg text-gray-700 mb-4">
                    Please select one of the tasks below. For each task, you will watch a short video and provide an operational definition of the behavior shown.
                </h3>
                <h3 className="text-md text-gray-600 italic">
                    Click on any task to begin. You will be able to watch the video and submit your response on the next page.
                </h3>

                <h1 className="text-2xl font-bold mb-8">Available Tasks</h1>
                <ul className="w-full max-w-2xl space-y-4">
                    {data.map((item, index) => (
                        <li key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <Link
                                href={`/task-selection/${item.id}`}
                                className="block p-6"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">Task {index + 1}</h2>
                                        <p className="text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800">
                                        Not Completed
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
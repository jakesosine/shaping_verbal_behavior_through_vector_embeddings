'use client'

import Link from "next/link";

type TaskSelectionProps = {
    videoId: string;
    startTime: number;
    endTime: number;
    description: string;
}[]

const data: TaskSelectionProps = [
    { videoId: '1', startTime: 1, endTime: 2, description: 'Watch the video and provide an description of what you observed.' },
    { videoId: '2', startTime: 3, endTime: 4, description: 'Watch the video and provide an description of what you observed.' },
    { videoId: '3', startTime: 5, endTime: 6, description: 'Watch the video and provide an description of what you observed.' },
];

export default function TaskSelection() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-8">Available Tasks</h1>
            <ul className="w-full max-w-2xl space-y-4">
                {data.map((item) => (
                    <li key={item.videoId} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <Link
                            href={`/task/${item.videoId}`}
                            className="block p-6"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Task {item.videoId}</h2>
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
    );
}

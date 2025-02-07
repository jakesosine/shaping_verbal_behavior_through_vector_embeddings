'use client'
import React from "react";
import { useState, useEffect } from "react";
import Feedback from "./feedback";
import { processTextInput } from "@/app/(task)/actions/action";
import { useRouter } from "next/navigation";

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

export default function VideoEmbed({ task }: { task: taskData }) {

    const router = useRouter();
    const [notes, setNotes] = useState(""); // State to hold textarea input
    const [showFeedback, setShowFeedback] = useState(false);
    const [loading, setLoading] = useState(false);
    const [trialNumber, setTrialNumber] = useState(1);
    const [taskDataIndex, setTaskDataIndex] = useState(0);

    useEffect(() => {
        if (!task || task.length === 0 || !task[taskDataIndex]) {
            return;
        }
    }, [task, taskDataIndex]);

    if (!task || task.length === 0 || !task[taskDataIndex]) {
        return <div>No tasks available</div>;
    }

    const currentTask = task[taskDataIndex];
    const videoUrl = currentTask.url;
    const maxTrials = 2;

    useEffect(() => {
        if (trialNumber > maxTrials) {
            // Check if there are more tasks available:
            if (taskDataIndex < task.length - 1) {
                setTaskDataIndex(taskDataIndex + 1);
                setTrialNumber(1);
                setNotes("");
                setShowFeedback(false);
            } else {
                // Navigation is now triggered as a side effect, not during render:
                router.push("/thank-you");
            }
        }
    }, [trialNumber, maxTrials, taskDataIndex, task, router]);


    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        if (input.length <= 200) {  // Only update if within character limit
            setNotes(input);
        }
    };

    return (
        <div className="flex flex-col items-center w-full justify-center min-h-screen p-4 bg-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-center">
                Here is the video you will be describing:
            </h2>
            <div className="w-full flex md:max-w-lg  lg:max-w-full justify-center">
                <iframe
                    className="justify-center w-1/2 h-64 m-6 md:h-80 lg:h-96 rounded-lg shadow-lg"
                    src={videoUrl}
                    title="Video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {showFeedback && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-xl w-full transform transition-all duration-300 scale-95 hover:scale-100">
                        <div className="flex justify-end items-end mb-4">
                            <button
                                onClick={() => setShowFeedback(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex justify-center items-center">
                            <Feedback
                                cosineSimilarity={0.2}
                                notes={notes}
                            />
                        </div>
                    </div>
                </div>
            )}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                </div>
            )}

            <div className="w-full max-w-sm md:max-w-lg lg:max-w-xl">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md">
                            <span className="text-2xl font-bold">{trialNumber}</span>
                            <span className="text-indigo-200">/10</span>
                            <span className="text-indigo-200"> Attempts</span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        {`${notes.length}/200 characters`}
                    </div>
                </div>
                <textarea
                    className="w-full min-h-[200px] max-h-[400px] p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your description of the video here"
                    value={notes}
                    onChange={handleTextareaChange}
                    maxLength={200}
                ></textarea>
            </div>
            <button
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="button"
                onClick={async () => {
                    try {
                        const jwt = sessionStorage.getItem("jwt");
                        if (!jwt || !notes.trim()) {
                            return;
                        }
                        setLoading(true);
                        console.log(currentTask.id);
                        const response = await processTextInput(notes, currentTask.id, trialNumber, jwt);
                        if (response) {
                            setShowFeedback(true);
                            // Simply update the trial number here:
                            setTrialNumber(prev => prev + 1);
                        }
                    } catch (error) {
                        console.error("Error submitting answer:", error);
                    } finally {
                        setLoading(false);
                    }
                }}
            >
                Submit Answer
            </button>

        </div>
    );
};

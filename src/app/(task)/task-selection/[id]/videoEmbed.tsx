'use client'
import React from "react";
import { useState } from "react";
import Feedback from "./feedback";
import { processTextInput } from "@/app/(task)/actions/action";

export default function VideoEmbed({ videoId, startTime, endTime, id }: { videoId: string, startTime: number, endTime: number, id: number }) {
    const [notes, setNotes] = useState(""); // State to hold textarea input
    const [showFeedback, setShowFeedback] = useState(true);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);

    const videoUrl = `https://www.youtube.com/embed/${videoId}?start=${startTime}&end=${endTime}`;

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        if (input.length <= 200) {  // Only update if within character limit
            setNotes(input);
        }
    };


    const feedbackData = {
        cosineSimilarity: 0.2,
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

            {showFeedback && feedbackData && (
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
                                cosineSimilarity={feedbackData.cosineSimilarity}
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
                <div className="text-right text-sm text-gray-500 mb-1">
                    {`${notes.length}/200 characters`}
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
                        if (!jwt) {
                            alert("Please log in to submit your answer");
                            return;
                        }

                        if (!notes.trim()) {
                            alert("Please enter your answer before submitting");
                            return;
                        }
                        setLoading(true);
                        const response = await processTextInput(notes, id, jwt);
                        if (response?.feedback) {
                            setFeedback(response.feedback);
                            setShowFeedback(true);
                        }
                        alert("Answer submitted successfully!");
                    } catch (error) {
                        console.error("Error submitting answer:", error);
                        alert("Failed to submit answer. Please try again.");
                    }
                }}
            >
                Submit Answer
            </button>
        </div>
    );
};

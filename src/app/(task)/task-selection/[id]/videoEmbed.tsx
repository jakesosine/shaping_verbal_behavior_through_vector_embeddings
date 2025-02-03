'use client'
import React from "react";
import { useState } from "react";
import Feedback from "./feedback";
import { processTextInput } from "@/app/(task)/actions/action";

export default function VideoEmbed({ videoId, startTime, endTime, id }: { videoId: string, startTime: number, endTime: number, id: number }) {
    const [notes, setNotes] = useState(""); // State to hold textarea input
    const videoUrl = `https://www.youtube.com/embed/${videoId}?start=${startTime}&end=${endTime}`;

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };

    const feedbackData = {
        cosineSimilarity: 0.2,
        dotProduct: 0.6,
        clear: true,
        objective: true,
        complete: "Partial",
    };

    return (
        <div className="flex flex-col items-center w-full justify-center min-h-screen p-4 bg-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-center">
                Operationally Define the Behavior
            </h2>
            <p>You are presented with a video, please define the behavior</p>
            <div className="w-full flex md:max-w-lg lg:max-w-full">
                <iframe
                    className="w-2/3 h-64 m-6 md:h-80 lg:h-96 rounded-lg shadow-lg"
                    src={videoUrl}
                    title="Video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <div className="w-1/3 h-64 m-6 md:h-80 lg:h-96 rounded-lg shadow-lg">
                    <Feedback
                        cosineSimilarity={feedbackData.cosineSimilarity}
                        dotProduct={feedbackData.dotProduct}
                        clear={feedbackData.clear}
                        objective={feedbackData.objective}
                        complete={feedbackData.complete}
                    />
                </div>
            </div>
            <textarea
                className="mt-4 w-full min-h-[200px] max-h-[400px] max-w-sm md:max-w-lg lg:max-w-xl p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the operational definition here"
                value={notes} // Set the value to the notes state
                onChange={handleTextareaChange} // Update state on change
            ></textarea>
            <button
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="button"
                onClick={async () => {
                    console.log("Notes:", notes);
                    const jwt = sessionStorage.getItem("jwt");
                    if (jwt) {
                        await processTextInput(notes, id, jwt);
                    }
                }}
            >
                Submit Answer
            </button>
        </div>
    );
};

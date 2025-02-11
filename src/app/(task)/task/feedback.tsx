import React from "react";
import BulletChart from "./bullet";

export default function Feedback({
    cosineSimilarity,
    notes,
}: {
    cosineSimilarity: number;
    notes: string;
}) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-auto transform transition-all hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Your Submission</h2>
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{notes}</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Feedback Score</h3>
                <div className="transform transition hover:scale-[1.02]">
                    <BulletChart normalizedValue={cosineSimilarity} />
                </div>
            </div>
        </div>
    );
};

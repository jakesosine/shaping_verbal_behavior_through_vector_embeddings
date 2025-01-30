import React from "react";
import BulletChart from "./bullet";

export default function Feedback({
    cosineSimilarity,
    dotProduct,
    clear,
    objective,
    complete,
}: {
    cosineSimilarity: number;
    dotProduct: number;
    clear: boolean;
    objective: boolean;
    complete: string;
}) {
    return (
        <div className="bg-white h-full rounded-lg p-6 max-w-sm w-full mx-auto">
            <h2 className="text-xl font-bold mb-4">Feedback</h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">Clear: </span>
                    <span className="text-green-600 font-semibold">
                        {clear ? "Yes" : "No"}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">Objective: </span>
                    <span className="text-green-600 font-semibold">
                        {objective ? "Yes" : "No"}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">Complete: </span>
                    <span className="text-yellow-500 font-semibold"> {complete}</span>
                </div>
                <div className="flex justify-between items-start p-1">
                    <span className="text-gray-700 w-40">Dot Product:</span>
                    <div className="flex-1">
                        <BulletChart value={dotProduct} />
                    </div>
                </div>

                <div className="flex justify-between items-start p-1">
                    <span className="text-gray-700 w-40">Cosine Similarity:</span>
                    <div className="flex-1">
                        <BulletChart value={cosineSimilarity} />
                    </div>
                </div>
            </div>
        </div>
    );
};


import React from "react";
import BulletChart from "./bullet";

interface FeedbackProps {
    cosineSimilarity: number;
    notes: string;
    changedValue: number;
}

const Feedback: React.FC<FeedbackProps> = ({ cosineSimilarity, notes, changedValue }) => {
    // Determine the text color and message based on changedValue.
    let message = "";
    if (changedValue < 0) {
        message = `${Math.abs(changedValue)}%`;
    } else if (changedValue > 0) {
        message = `+${Math.abs(changedValue)}%`;
    } else {
        message = `0%`;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-auto transform transition-all hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Your Submission</h2>
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{notes}</p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Feedback Score</h3>
                <p className="leading-relaxed">
                    <span className="text-black text-xl">Your score has {changedValue < 0 ? "decreased" : changedValue > 0 ? "increased" : "changed"} by </span>
                    <span className={
                        changedValue < 0 ? "text-red-500 text-xl" :
                            changedValue > 0 ? "text-green-500 text-xl" :
                                "text-gray-700 text-xl"
                    }>
                        {message}
                    </span>
                </p>
                <div className="transform transition hover:scale-[1.02]">
                    <BulletChart normalizedValue={cosineSimilarity} />
                </div>
            </div>
        </div>
    );
};

export default Feedback;

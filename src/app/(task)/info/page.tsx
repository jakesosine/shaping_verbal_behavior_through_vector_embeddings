"use client"
import Feedback from "../task-selection/[id]/feedback";
import React from "react";
import BulletChart from "../task-selection/[id]/bullet";

export default function Info() {
    return (
        <div className="bg-white h-full rounded-lg p-6 py-12 max-w-3xl w-full mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Task Information & Feedback Guide</h2>

            <div className="space-y-6 text-gray-700 mb-8">
                <p className="leading-relaxed">
                    In this experiment, you will be shown a one-minute video clip that you'll need to describe in your own words.
                    Before watching, you'll receive guidance on specific aspects to observe. Your description will be compared
                    to a pre-written description of the video.
                </p>

                <p className="leading-relaxed">
                    You will receive feedback through a <strong>meter</strong> that will be shown below. A <strong>high score</strong> will return a color of <span className="text-green-600 font-semibold">green</span>, for example, the meter below:
                </p>
                <div className="w-full">
                    <BulletChart value={0.9} />
                </div>
                <p className="leading-relaxed">
                    A <strong>poor score</strong> will return a color of <span className="text-red-600 font-semibold">red</span>, for example, the meter below:
                </p>
                <div className="w-full">
                    <BulletChart value={.1} />
                </div>

                <p className="leading-relaxed">
                    A <strong>medium score</strong> will return a color of <span className="text-yellow-600 font-semibold">yellow</span>, for example, the meter below:
                </p>
                <div className="w-full">
                    <BulletChart value={.5} />
                </div>
                <p className="leading-relaxed">
                    You will have 10 attempts to achieve your highest possible score. After each attempt, you will be shown the meter to see your progress.
                    Use the meter to guide your improvements - if you see your meter move closer to the end, you're moving in the right direction! If you see your meter move closer to the start, you're moving in the wrong direction.
                </p>
                <p className="leading-relaxed">
                    Here is what the feedback will look like for a submission:
                </p>
                <div className="w-full">
                    <Feedback
                        cosineSimilarity={0.9}
                        notes="Here is an example of where your submission will show up in the feedback. You can see by the meter that this submission was very good."
                    />
                </div>

                <button
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => window.location.href = '/task-selection/1'}
                >
                    Begin Task
                </button>
            </div>
        </div>
    );
};

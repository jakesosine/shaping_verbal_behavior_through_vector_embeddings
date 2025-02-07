'use client'

import { useState } from 'react'
import { createTask } from '../actions/action'
export default function AdminPage() {
    const [videoUrl, setVideoUrl] = useState('')
    const [instructions, setInstructions] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [comparisonDescription, setComparisonDescription] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [attempts, setAttempts] = useState(1)


    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Upload New Task</h1>

            <form className="space-y-6">
                <div>
                    <label
                        htmlFor="video"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Video URL
                    </label>
                    <input
                        type="url"
                        id="video"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter video URL"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="startTime"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Start Time (seconds)
                        </label>
                        <input
                            type="number"
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter start time"
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="endTime"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            End Time (seconds)
                        </label>
                        <input
                            type="number"
                            id="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter end time"
                            required
                            min="0"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="instructions"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Task Instructions
                    </label>
                    <textarea
                        id="instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Enter task instructions"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="comparisonDescription"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Comparison Description
                    </label>
                    <textarea
                        id="comparisonDescription"
                        value={comparisonDescription}
                        onChange={(e) => setComparisonDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Enter comparison description"
                    />
                </div>
                <div>
                    <label
                        htmlFor="attempts"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Number of Attempts
                    </label>
                    <input
                        type="number"
                        id="attempts"
                        value={attempts}
                        onChange={(e) => setAttempts(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter number of attempts"
                        min={1}
                        required
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="isActive" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="isActive"
                                className="sr-only peer"
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 
                                      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                                      peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 
                                      after:start-[2px] after:bg-white after:border-gray-300 after:border 
                                      after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                                      peer-checked:bg-blue-600"></div>
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-700">
                            {isActive ? 'Active' : 'Inactive'}
                        </span>
                    </label>
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    onClick={async () => {
                        await createTask(attempts, videoUrl,
                            parseInt(startTime),
                            parseInt(endTime),
                            instructions,
                            comparisonDescription,
                            isActive)
                    }}
                >
                    Upload Task
                </button>
            </form>
        </div >
    )
}

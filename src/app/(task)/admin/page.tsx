'use client'

import { useState } from 'react'

export default function AdminPage() {
    const [videoUrl, setVideoUrl] = useState('')
    const [description, setDescription] = useState('')
    const [expertDescription, setExpertDescription] = useState('')
    const [isActive, setIsActive] = useState(true)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement video upload and task creation logic
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Upload New Task</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Task Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Enter task description"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="expertDescription"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Comparison Description
                    </label>
                    <textarea
                        id="expertDescription"
                        value={expertDescription}
                        onChange={(e) => setExpertDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Enter comparison description"
                    />
                </div>

                <div className="flex items-center">
                    <label
                        htmlFor="isActive"
                        className="block text-sm font-medium text-gray-700 mr-3"
                    >
                        Task Status
                    </label>
                    <div className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="isActive"
                            className="sr-only peer"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">
                            {isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    Upload Task
                </button>
            </form>
        </div>
    )
}

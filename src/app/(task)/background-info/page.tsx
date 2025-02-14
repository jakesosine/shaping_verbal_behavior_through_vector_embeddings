"use client";

import React, { useState } from "react";
import { backgroundInfo } from "../actions/action";
import { useRouter } from 'next/navigation';

type BackgroundFormData = {
    gender: string;
    race: string;
    agerange: string;
    highested: string;

};

export default function BackgroundInfoForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<BackgroundFormData>({
        gender: "",
        race: "",
        agerange: "",
        highested: "",

    });
    const [prolificId, setProlificId] = useState<string>("");

    const [error, setError] = useState<string | null>(null);

    return (

        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
                Demographic Information
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
                This information will only be used for research purposes.
            </p>
            <form >
                {[
                    {
                        id: "gender",
                        label: "Gender",
                        options: [
                            "Female",
                            "Male",
                            "Nonbinary",
                            "Other",
                            "Prefer Not to Say",
                        ],
                    },
                    {
                        id: "race",
                        label: "Race",
                        options: [
                            "Asian",
                            "American Indian",
                            "Alaska Native",
                            "Black",
                            "Hispanic/Latinx",
                            "Native Hawaiian/Pacific Islander",
                            "White",
                            "Prefer Not to Say",
                        ],
                    },
                    {
                        id: "agerange",
                        label: "Age Range",
                        options: [
                            "18-24",
                            "25-34",
                            "35-44",
                            "45-54",
                            "55-64",
                            "65+",
                            "Prefer Not to Say",
                        ],
                    },
                    {
                        id: "highested",
                        label: "Highest Degree",
                        options: [
                            "No formal education",
                            "Secondary education / High school diploma",
                            "Vocational training",
                            "Associate degree (or equivalent)",
                            "Bachelor's degree (or equivalent)",
                            "Master's degree (or equivalent)",
                            "Doctorate (Ph.D., Ed.D., etc.)",
                            "Prefer Not to Say",
                        ],
                    },
                ].map(({ id, label, options }) => (
                    <div className="mb-4" key={id}>
                        <label
                            htmlFor={id}
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            {label}
                        </label>
                        <select
                            id={id}
                            name={id}
                            value={formData[id as keyof BackgroundFormData]}
                            onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                            required
                            className="form-select block w-full mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            <option value="">
                                -- Please Select --
                            </option>

                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <div className="mb-4">
                    <label
                        htmlFor="prolificId"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Prolific ID
                    </label>
                    <input
                        type="text"
                        id="prolificId"
                        name="prolificId"
                        value={prolificId}
                        onChange={(e) => setProlificId(e.target.value)}
                        required
                        className="form-input block w-full mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700"

                        onClick={async (e) => {
                            e.preventDefault();
                            const jwt = sessionStorage.getItem('jwt');
                            if (jwt) {
                                const { hasBackground } = await backgroundInfo(formData, jwt, prolificId);
                                if (hasBackground) {
                                    router.push('/info');
                                }
                            } else {
                                console.log("No JWT found");
                                setError("You are not logged in. Please login and try again.");
                            }
                        }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

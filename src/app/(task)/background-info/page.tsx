"use client";

import React, { useState } from "react";

type FormData = {
    gender: string;
    race: string;
    agerange: string;
    highested: string;
};

export default function BackgroundInfoForm() {
    const [formData, setFormData] = useState<FormData>({
        gender: "",
        race: "",
        agerange: "",
        highested: "",
    });

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
                            value={formData[id as keyof FormData]}
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
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

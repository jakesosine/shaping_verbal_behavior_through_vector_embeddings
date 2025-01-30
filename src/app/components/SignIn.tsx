"use client";
import React, { useState, FormEvent } from "react";
import TermsModal from "./termsModal";
import { signIn } from "../(task)/actions/action";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [alphaKey, setAlphaKey] = useState("");
    const [error, setError] = useState("");
    const [signup, setSignup] = useState(false);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [signin, setSignin] = useState(true);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/${signin ? "signin" : "signup"}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    signin
                        ? { email, password }
                        : { email, password, alphaKey, termsAccepted }
                ),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            window.location.href = "/background-info";
            console.log(data);
        } catch (err) {
            setError('Failed to sign in');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="text-lg font-semibold text-gray-700">

            </div>
            <div
                className={`w-full max-w-md p-8 bg-white shadow-md rounded ${signup ? "mt-5" : ""
                    }`}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    {signup && (
                        <div>
                            <label
                                htmlFor="alphaKey"
                                className="block text-sm font-medium text-grey-700"
                            >
                                Alpha Key
                            </label>
                            <input
                                id="alphaKey"
                                type="text"
                                value={alphaKey}
                                onChange={(e) => setAlphaKey(e.target.value)}
                                autoComplete="off"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    )}
                    {(signup || signin) && (
                        <div className="flex items-center">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="terms"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                I agree to the{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsTermsModalOpen(true)}
                                    className="text-indigo-600 hover:text-indigo-500 underline"
                                >
                                    Terms and Conditions
                                </button>
                            </label>
                        </div>
                    )}
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {signup ? "Sign Up" : "Login"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setSignup(!signup)}
                        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {signup ? "Switch to Login" : "Switch to Sign Up"}
                    </button>
                </form>
            </div>
            <TermsModal
                isOpen={isTermsModalOpen}
                onRequestClose={() => setIsTermsModalOpen(false)}
            />
        </div>
    );
};


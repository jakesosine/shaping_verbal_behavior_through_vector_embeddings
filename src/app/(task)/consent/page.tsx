'use client'
import { submitConsent, submitNonConsent } from "../actions/action";
import { useState } from "react";

export default function Consent() {
    const [error, setError] = useState<string | null>(null);
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Research Study Consent Form</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Introduction</h2>
                        <p className="text-gray-600">
                            This research will ask you to describe a video in an objective manner. The purpose of the study
                            is to define and describe behaviors that are shown in a video.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Participation</h2>
                        <p className="text-gray-600">
                            Taking part in this survey is completely voluntary. You may withdraw your participation at any time,
                            and the researchers are available to discuss any questions or concerns. You are free to decline to
                            answer any question you do not wish to answer. There are no right or wrong answers. All answers
                            will remain completely anonymous.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Risks and Benefits</h2>
                        <p className="text-gray-600">
                            Taking part in this study may involve mild discomfort but involves no further foreseeable risks
                            other than those encountered in typical training and day-to-day life. The benefits of your
                            participation in this survey are monetary compensation ($4) for the time spent on the study.
                            The benefit of this study, in general, is evaluation of how novel methods for quantifying
                            language are useful.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Anonymity</h2>
                        <p className="text-gray-600">
                            Your name or identity will not be used in reports or presentations of the findings of this research.
                            Information provided to the researchers will be kept anonymous except for information that must be
                            reported under Massachusetts and Federal law, such as cases of child or elder abuse. All data will
                            be stored on Sharepoint, a secure password-protected electronic filing system.
                        </p>
                        <p className="text-gray-600 mt-4">
                            An analysis of the results and an explanation of the study will be available at the Endicott College
                            Institute for Applied Behavioral Science.
                        </p>
                    </section>



                    <section className="bg-gray-50 p-6 rounded-lg mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Electronic Consent</h2>
                        <p className="text-gray-600 mb-6">
                            Continuing with this application indicates that you have read the above information, that you
                            are voluntarily agreeing to participate and that you are 18 years of age or older.
                        </p>
                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <button
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium mb-4"
                            onClick={async () => {
                                const jwt = sessionStorage.getItem('jwt');
                                if (jwt) {
                                    const consent = await submitConsent(jwt);
                                    if (consent) {
                                        window.location.href = "/background-info";
                                    }

                                } else {
                                    setError("You are not logged in. Please login and try again.");
                                    console.log("No JWT found");
                                }
                            }}
                        >
                            I Agree to Participate
                        </button>

                        <button
                            className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium mt-4"
                            onClick={async () => {
                                const jwt = sessionStorage.getItem('jwt');
                                if (jwt) {
                                    const consent = await submitNonConsent(jwt);
                                    if (!consent) {
                                        sessionStorage.clear();
                                        window.location.href = "/";

                                    }
                                } else {
                                    setError("You are not logged in. Please login and try again.");
                                    console.log("No JWT found");
                                }
                            }}
                        >
                            I Do Not Agree to Participate
                        </button>
                    </section>

                    <p className="text-sm text-gray-500 text-center mt-6">
                        For questions or concerns about the research, please contact David J. Cox, PhD, MSB, BCBA-D
                        (dcox@endicott.edu) or Kylee Drugan-Eppich, MS, BCBA, LABA (kdruganeppich@mail.endicott.edu)
                    </p>
                </div>
            </div>
        </div >
    );
}
'use client'
import { submitConsent, submitNonConsent } from "../actions/action";

export default function Consent() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Research Study Consent Form</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Purpose of the Study</h2>
                        <p className="text-gray-600">
                            This research study aims to understand user behavior and interaction patterns to improve digital experiences.
                            Your participation will help advance our understanding of human-computer interaction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">What to Expect</h2>
                        <p className="text-gray-600">
                            You will be asked to complete various tasks and provide feedback on your experience.
                            The study will take approximately 15-20 minutes to complete.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Risks and Benefits</h2>
                        <p className="text-gray-600">
                            There are no known risks associated with this study. Your participation will contribute to
                            the advancement of research in this field and help improve future user experiences.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Privacy</h2>
                        <p className="text-gray-600">
                            All collected data will be anonymized and stored securely. Your personal information will
                            not be shared with any third parties.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-6 rounded-lg mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Declaration of Consent</h2>
                        <p className="text-gray-600 mb-6">
                            By clicking &quot;I Agree&quot;, you confirm that you:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                            <li>Have read and understood the study information</li>
                            <li>Voluntarily agree to participate in this research</li>
                            <li>Are at least 18 years of age</li>
                            <li>Understand you can withdraw at any time</li>
                        </ul>

                        <button
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium mb-4"
                            onClick={() => {
                                const jwt = sessionStorage.getItem('jwt');
                                console.log(jwt);
                                if (jwt) {
                                    submitConsent(jwt);
                                } else {
                                    console.log("No JWT found");
                                }
                            }}
                        >
                            I Agree to Participate
                        </button>

                        <button
                            className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium mt-4"
                            onClick={() => {
                                const jwt = sessionStorage.getItem('jwt');
                                console.log(jwt);
                                if (jwt) {
                                    submitNonConsent(jwt);
                                    sessionStorage.clear();
                                    window.location.href = "/";
                                } else {
                                    console.log("No JWT found");
                                }
                            }}
                        >
                            I Do Not Agree to Participate
                        </button>
                    </section>

                    <p className="text-sm text-gray-500 text-center mt-6">
                        If you have any questions about this study, please contact research@example.com
                    </p>
                </div>
            </div>
        </div >
    );
}
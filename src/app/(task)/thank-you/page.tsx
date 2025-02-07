'use client';

import { useRouter } from 'next/navigation';

export default function ThankYou() {
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Thank You for Participating!
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                    We appreciate your time and contribution to our study.
                </p>
                <button
                    onClick={handleLogout}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
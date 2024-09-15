import React from 'react';
import Link from "next/link";
import './globals.css';

const Page = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
                <p className="text-lg mb-8">Your journey starts here. Click the button below to log in.</p>
                <Link href="/dashboard" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">Get Started</Link>
            </div>
        </div>
    );
};

export default Page;
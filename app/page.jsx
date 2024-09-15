import React from 'react';
import Link from "next/link";
import './globals.css';

const Page = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">TaskMaster Pro</h1>
                    <p className="text-lg text-gray-600 mb-8">Streamline your workflow with role-based task
                        management</p>
                    <div className="space-y-4">
                        <Link href="/login"
                              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center space-x-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                            </svg>
                            <span>Log In</span>
                        </Link>
                        <Link href="/register"
                              className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center justify-center space-x-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                            </svg>
                            <span>Sign Up</span>
                        </Link>
                    </div>
                </div>
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Key Features:</h2>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Role-based task assignment
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Real-time collaboration
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                            </svg>
                            Progress tracking
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Page;
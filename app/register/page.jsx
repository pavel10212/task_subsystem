"use client";

import {useState} from "react";
import Link from "next/link";
import {z} from "zod";
import {motion} from "framer-motion";
import Image from "next/image";
import {toast, Bounce} from "react-toastify";
import {useRouter} from "next/navigation";

const emailSchema = z.string().email("Invalid email address");

const Page = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [taskLoad, setTaskLoad] = useState(0);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        try {
            emailSchema.parse(email);
        } catch (error) {
            setErrors(prev => ({...prev, email: error.errors[0].message}));
        }

        if (password !== confirmPassword) {
            setErrors(prev => ({...prev, confirmPassword: "Passwords do not match"}));
        }

        if (!role) {
            setErrors(prev => ({...prev, role: "Please select a role"}));
        }

        if (Object.keys(errors).length > 0) {
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password, role, taskLoad}),
            });

            if (response.ok) {
                console.log("User created successfully");
                toast.success("User created successfully", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    theme: "light",
                    transition: Bounce
                });
                router.push("/login");
            } else {
                const data = await response.json();
                setErrors(prev => ({...prev, api: data.error}));
            }
        } catch (error) {
            setErrors(prev => ({...prev, api: "An unexpected error occurred. Please try again."}));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="sm:mx-auto sm:w-full sm:max-w-md"
            >
                <Image
                    className="mx-auto h-12 w-auto"
                    src="/favicon.ico"
                    alt="Your Company"
                    width={48}
                    height={48}
                />
                <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Join us and start your journey
                </p>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.2}}
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            >
                <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>


                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="taskLimit"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Task Limit
                            </label>
                            <div className="mt-1">
                                <input
                                    id="taskLimit"
                                    name="taskLimit"
                                    type="number"
                                    required
                                    placeholder="How many tasks can you do at a time?"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                    value={taskLoad}
                                    onChange={(e) => setTaskLoad(e.target.value)}
                                />
                            </div>
                            {errors.taskLimit && (
                                <p className="mt-2 text-sm text-red-600">{errors.taskLimit}</p>
                            )}
                        </div>


                        <div>
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Role
                            </label>
                            <div className="mt-1">
                                <select
                                    id="role"
                                    name="role"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Select a role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Maid">Maid</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Co-Host">Co-Host</option>
                                </select>
                            </div>
                            {errors.role && (
                                <p className="mt-2 text-sm text-red-600">{errors.role}</p>
                            )}
                        </div>

                        {errors.api && (
                            <div className="text-red-500 text-sm mt-2">{errors.api}</div>
                        )}

                        <div>
                            <Link
                                href="/login"
                                className="text-sm text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                            >
                                Already have an account?
                            </Link>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        animate={{rotate: 360}}
                                        transition={{duration: 1, repeat: Infinity, ease: "linear"}}
                                        className="w-5 h-5 border-t-2 border-white border-solid rounded-full"
                                    />
                                ) : (
                                    "Register"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Page;
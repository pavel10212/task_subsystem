"use client";

import {signIn} from "next-auth/react";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {motion} from "framer-motion";
import Link from "next/link";
import {toast, Bounce} from "react-toastify";

const loginSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
});

const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            loginSchema.parse({email, password});

            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                console.error(result.error);
                setErrors({form: result.error});
            } else {
                toast.success("Logged in successfully", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                console.log("Logged in successfully");
                router.push("/dashboard");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors = {};
                error.errors.forEach((err) => {
                    formattedErrors[err.path[0]] = err.message;
                });
                setErrors(formattedErrors);
            }
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
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
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
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>
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
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>
                        </div>

                        {errors.form && (
                            <p className="text-sm text-red-600 text-center">{errors.form}</p>
                        )}

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
                                    "Sign in"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>

            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <Link
                    href="/register"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                >
                    Register now
                </Link>
            </p>
        </div>
    );
};

export default Page;
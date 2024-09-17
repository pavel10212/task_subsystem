"use client";

import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {FaPlus, FaChartLine} from "react-icons/fa";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
import TaskList from "@/components/TaskList";
import UserInfoIcon from "@/components/UserInfoIcon";
import TaskForm from "@/components/TaskForm";

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchUser();
        fetchTasks();
        if (userRole === "Admin") {
            fetchUsers();
        }
    }, [userRole]);

    const openModal = (task = null) => {
        setIsEditMode(!!task);
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
    };

    const handleCreateOrUpdateTask = async (e) => {
        e.preventDefault();
        const taskName = e.target.taskName
            ? e.target.taskName.value
            : currentTask.title;
        const taskDescription = e.target.taskDescription
            ? e.target.taskDescription.value
            : currentTask.description;
        const taskStatus = e.target.taskStatus.value;
        const assignedTo = e.target.assignedTo
            ? e.target.assignedTo.value
            : currentTask.userId;
        const rawDueDate = e.target.dueDate ? e.target.dueDate.value : currentTask.dueDate;
        const dueDate = new Date(rawDueDate).toISOString();
        const priority = e.target.priority ? e.target.priority.value : currentTask.priority;


        if (isEditMode) {
            await fetch("/api/updateTask", {
                method: "PUT",
                body: JSON.stringify({
                    id: currentTask.id,
                    title: taskName,
                    description: taskDescription,
                    userId: assignedTo,
                    status: taskStatus,
                    dueDate: dueDate,
                    priority: priority,
                }),
                headers: {"Content-Type": "application/json"},
            });
            closeModal();
            await fetchTasks();
        } else {
            let indexId = tasks.length + 1;
            while (tasks.some((task) => task.indexId === indexId)) {
                indexId += 1;
            }
            const response = await fetch("/api/newTask", {
                method: "POST",
                body: JSON.stringify({
                    indexId: indexId,
                    title: taskName,
                    description: taskDescription,
                    userId: assignedTo,
                    dueDate: dueDate,
                    priority: priority,
                }),
                headers: {"Content-Type": "application/json"},
            });
            const data = await response.json();
            console.log(data.message);
            closeModal();
            await fetchTasks();
        }
    };

    const handleDeleteTask = async (task) => {
        const confirmDelete = confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            const response = await fetch("/api/deleteTask", {
                method: "POST",
                body: JSON.stringify({task}),
                headers: {"Content-Type": "application/json"},
            });
            if (response) {
                console.log("Task deleted successfully");
            }
            await fetchTasks();
        }
    };

    const fetchUser = async () => {
        try {
            const response = await fetch("/api/user");
            const data = await response.json();
            setUserName(data.name);
            setUserRole(data.role);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await fetch("/api/fetchTasks");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/getUsers");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut({redirect: false, callbackUrl: "/login"});
            router.push("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const isAdmin = userRole;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-800">Task Dashboard</h1>
                    <div className="flex space-x-4 items-center">
                        <UserInfoIcon
                            userName={userName}
                            userRole={userRole}
                            onLogout={handleLogout}
                        />
                        <Link href="/dashboard/performance">
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
                            >
                                <FaChartLine className="mr-2"/> Performance
                            </motion.button>
                        </Link>
                        {userRole === "Admin" && (
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={() => openModal()}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
                            >
                                <FaPlus className="mr-2"/> Create Task
                            </motion.button>
                        )}
                    </div>
                </div>
                <TaskList
                    tasks={tasks}
                    onEdit={openModal}
                    onDelete={handleDeleteTask}
                    isAdmin={isAdmin}
                    users={users}
                />
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <motion.div
                            initial={{y: -50, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: 50, opacity: 0}}
                            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-indigo-800">
                                {isEditMode ? "Edit Task" : "Create Task"}
                            </h2>
                            <TaskForm
                                isEditMode={isEditMode}
                                currentTask={currentTask}
                                onSubmit={handleCreateOrUpdateTask}
                                onCancel={closeModal}
                                isAdmin={isAdmin}
                                users={users}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Page;

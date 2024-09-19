"use client";

import {useCallback, useEffect, useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {FaArrowLeft} from "react-icons/fa";
import {DataGrid} from "@mui/x-data-grid";
import {
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    calculateAverageTaskDuration,
    calculateTaskCompletionRate,
    currentUserTaskLoad,
    late_tasks,
} from "@/utils/calculations";

const PerformanceAnalytics = () => {
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    const fetchUser = async () => {
        try {
            const response = await fetch("/api/user");
            const data = await response.json();
            setUserName(data.name);
            setUserRole(data.role);
            setUserId(data.id);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchUsers = useCallback(async () => {
        try {
            if (userRole === "Admin") {
                const res = await fetch("/api/getUsers");
                if (!res.ok) throw new Error("Failed to fetch users");
                const data = await res.json();
                setUsers(data);
            } else {
                setUsers([{id: userId, name: userName}]);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [userRole, userId, userName]);

    const fetchTasks = useCallback(async () => {
        try {
            const res = await fetch("/api/fetchTasks");
            if (!res.ok) throw new Error("Failed to fetch tasks");
            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (userRole) {
            fetchUsers();
            fetchTasks();
        }
    }, [userRole, fetchUsers, fetchTasks]);
    const columns = [
        {field: "id", headerName: "ID", width: 90},
        {field: "name", headerName: "Name", width: 150},
        {field: "assignedTasks", headerName: "Assigned Tasks", width: 150, type: "number"},
        {field: "completedTasks", headerName: "Completed Tasks", width: 150, type: "number"},
        {
            field: "taskCompletionRate",
            headerName: "Task Completion Rate (%)",
            width: 200,
            type: "number",
        },
        {
            field: "averageTaskCompletionTime",
            headerName: "Avg Completion Time (hrs)",
            width: 200,
            type: "number",
        },
        {field: "lateTasks", headerName: "Late Tasks", width: 130, type: "number"},
        {field: "userTaskLoad", headerName: "User Task Load (%)", width: 150, type: "number"},
        {field: "maxUserLoad", headerName: "Max Concurrent Tasks", width: 200, type: "number"}
    ];

    const rows = users.map((user) => {
        const userTasks = tasks.filter((task) => task.userId === user.id);
        const completedTasksCount = userTasks.filter((task) => task.status === "Completed").length;
        return {
            id: user.id,
            name: user.name,
            assignedTasks: userTasks.length,
            completedTasks: completedTasksCount,
            taskCompletionRate: calculateTaskCompletionRate(userTasks),
            averageTaskCompletionTime: calculateAverageTaskDuration(userTasks) < 0.001 ? 0 : calculateAverageTaskDuration(userTasks),
            lateTasks: late_tasks(userTasks),
            userTaskLoad: currentUserTaskLoad(userTasks, user.taskLoad),
            maxUserLoad: user.taskLoad
        };
    });

    const totalAssignedTasks = rows.reduce((sum, row) => sum + row.assignedTasks, 0);
    const totalCompletedTasks = rows.reduce((sum, row) => sum + row.completedTasks, 0);
    const overallCompletionRate = totalAssignedTasks > 0
        ? (totalCompletedTasks / totalAssignedTasks) * 100
        : 0;

    const overallAverageCompletionTime = rows.reduce((sum, row) => {
    return row.completedTasks > 0 ? sum + row.averageTaskCompletionTime : sum;
}, 0) / rows.filter(row => row.completedTasks > 0).length;
    const pieChartData = [
        {name: "Completed", value: rows.reduce((sum, row) => sum + row.completedTasks, 0)},
        {name: "Pending", value: rows.reduce((sum, row) => sum + (row.assignedTasks - row.completedTasks), 0)},
    ];

    const COLORS = ["#0088FE", "#00C49F"];

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-800">Performance Analytics</h1>
                <Link href="/dashboard">
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300"
                        aria-label="Back to Dashboard"
                    >
                        <FaArrowLeft/>
                    </motion.button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-700">Overall Task Completion</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                ))}
                            </Pie>
                            <Tooltip/>
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-700">Task Completion Rates</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={rows}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="taskCompletionRate" stroke="#8884d8" activeDot={{r: 8}}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4 text-indigo-700">Key Performance Indicators</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-indigo-100 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-indigo-800">Overall Completion Rate</h3>
                        <p className="text-3xl font-bold text-indigo-600">{overallCompletionRate.toFixed(2)}%</p>
                    </div>
                    <div className="bg-indigo-100 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-indigo-800">Avg Completion Time</h3>
                        <p className="text-3xl font-bold text-indigo-600">{overallAverageCompletionTime.toFixed(2)} hrs</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-indigo-700">Detailed Performance Data</h2>
                <div style={{height: 400, width: "100%"}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        className="bg-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default PerformanceAnalytics;
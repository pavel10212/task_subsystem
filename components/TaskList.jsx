import {motion} from 'framer-motion';
import {FaEdit, FaTrash} from 'react-icons/fa';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const TaskList = ({tasks, onEdit, onDelete, isAdmin, users}) => {
    const formatDate = (dateString) => {
        return dayjs(dateString).format('Do MMM YYYY, h:mm A');
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-800 border-red-300';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Low':
                return 'bg-green-100 text-green-800 border-green-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full">
                <thead className="bg-indigo-600 text-white">
                <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Priority</th>
                    <th className="py-3 px-4 text-left">Date & Time</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    {isAdmin === "Admin" && <th className="py-3 px-4 text-left">Assigned To</th>}
                    <th className="py-3 px-4 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <motion.tr
                        key={task.id}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
                    >
                        <td className="py-3 px-4 text-gray-600">{task.indexId}</td>
                        <td className="py-3 px-4 font-medium text-gray-800">{task.title}</td>
                        <td className="py-3 px-4 text-gray-600">{task.description}</td>
                        <td className="py-3 px-4">
                                <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityClass(task.priority)}`}>
                                    {task.priority}
                                </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{formatDate(task.dueDate)}</td>
                        <td className="py-3 px-4">
                                <span
                                    className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                                    {task.status}
                                </span>
                        </td>
                        {isAdmin === "Admin" && (
                            <td className="py-3 px-4 text-gray-600">
                                {users.find(user => user.id === task.userId)?.name || 'Unassigned'}
                            </td>
                        )}
                        <td className="py-3 px-4">
                            <motion.button
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.9}}
                                onClick={() => onEdit(task)}
                                className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300 mr-2"
                            >
                                <FaEdit/>
                            </motion.button>
                            {isAdmin === "Admin" && (
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    onClick={() => onDelete(task)}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
                                >
                                    <FaTrash/>
                                </motion.button>
                            )}
                        </td>
                    </motion.tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
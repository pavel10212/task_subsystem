import {motion} from 'framer-motion';
import {FaEdit, FaTrash} from 'react-icons/fa';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const TaskList = ({tasks, onEdit, onDelete, isAdmin, users}) => {
    const formatDate = (dateString) => {
        return dayjs(dateString).format('Do MMM YYYY, h:mm A');
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full">
                <thead className="bg-indigo-100">
                <tr>
                    <th className="py-3 px-4 text-left text-indigo-800">ID</th>
                    <th className="py-3 px-4 text-left text-indigo-800">Name</th>
                    <th className="py-3 px-4 text-left text-indigo-800">Description</th>
                    <th className="py-3 px-4 text-left text-indigo-800">Date & Time</th>
                    <th className="py-3 px-4 text-left text-indigo-800">Status</th>
                    {isAdmin === "Admin" && <th className="py-3 px-4 text-left text-indigo-800">Assigned To</th>}
                    <th className="py-3 px-4 text-left text-indigo-800">Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <motion.tr
                        key={task.id}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="border-b border-indigo-100 hover:bg-indigo-50 transition duration-300"
                    >
                        <td className="py-3 px-4">{task.indexId}</td>
                        <td className="py-3 px-4 font-medium">{task.title}</td>
                        <td className="py-3 px-4">{task.description}</td>
                        <td className="py-3 px-4">{formatDate(task.dueDate)}</td>
                        <td className="py-3 px-4">{task.status}</td>
                        {isAdmin === "Admin" && (
                            <td className="py-3 px-4">
                                {users.find(user => user.id === task.userId)?.name || 'Unassigned'}
                            </td>
                        )}
                        <td className="py-3 px-4">
                            <motion.button
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.9}}
                                onClick={() => onEdit(task)}
                                className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 mr-2"
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
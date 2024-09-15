import {motion} from 'framer-motion';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from "@mui/x-date-pickers";

const TaskForm = ({isEditMode, currentTask, onSubmit, onCancel, isAdmin, users}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={onSubmit}>
                {isAdmin === "Admin" && (
                    <>
                        <div className="mb-4">
                            <label className="block text-indigo-700 mb-2">Task Name</label>
                            <input
                                type="text"
                                name="taskName"
                                defaultValue={isEditMode ? currentTask.title : ''}
                                className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-indigo-700 mb-2">Task Description</label>
                            <textarea
                                name="taskDescription"
                                defaultValue={isEditMode ? currentTask.description : ''}
                                className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-indigo-700 mb-2">Due Date</label>
                            <DateTimePicker
                                name="dueDate"
                                defaultValue={isEditMode ? dayjs(currentTask.dueDate) : dayjs()}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                )}
                                required
                            />
                        </div>
                    </>
                )}
                <div className="mb-4">
                    <label className="block text-indigo-700 mb-2">Task Status</label>
                    <select
                        name="taskStatus"
                        defaultValue={isEditMode ? currentTask.status : ''}
                        className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="Not Started">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                {isAdmin === "Admin" && (
                    <div className="mb-4">
                        <label className="block text-indigo-700 mb-2">Assign To</label>
                        <select
                            name="assignedTo"
                            defaultValue={isEditMode ? currentTask.userId : ''}
                            className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Unassigned</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.email + " |  " + user.name + " | Role: " + user.role}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="flex justify-end">
                    <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        type="button"
                        onClick={onCancel}
                        className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        {isEditMode ? 'Update' : 'Create'}
                    </motion.button>
                </div>
            </form>
        </LocalizationProvider>
    );
};

export default TaskForm;
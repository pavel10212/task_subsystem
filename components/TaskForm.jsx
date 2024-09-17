import { useState } from 'react';
import { motion } from 'framer-motion';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers";

const TaskForm = ({ isEditMode, currentTask, onSubmit, onCancel, isAdmin, users }) => {
    const [formErrors, setFormErrors] = useState({});

    const validateForm = (formData) => {
        const errors = {};
        if (isAdmin === "Admin") {
            if (!formData.get('taskName')) errors.taskName = 'Task Name is required';
            if (!formData.get('taskDescription')) errors.taskDescription = 'Task Description is required';
            if (!formData.get('dueDate')) errors.dueDate = 'Due Date is required';
            if (!formData.get('priority')) errors.priority = 'Priority is required';
        }
        if (!formData.get('taskStatus')) errors.taskStatus = 'Task Status is required';
        if (isAdmin === "Admin" && !formData.get('assignedTo')) errors.assignedTo = 'Assign To is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const errors = validateForm(formData);

        if (Object.keys(errors).length === 0) {
            setFormErrors({});
            onSubmit(e);
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit}>
                {isAdmin === "Admin" && (
                    <>
                        <div className="mb-4">
                            <label className="block text-indigo-700 mb-2">Task Name</label>
                            <input
                                type="text"
                                name="taskName"
                                defaultValue={isEditMode ? currentTask.title : ''}
                                className={`w-full px-3 py-2 border ${formErrors.taskName ? 'border-red-500' : 'border-indigo-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            />
                            {formErrors.taskName && <p className="text-red-500 text-sm mt-1">{formErrors.taskName}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-indigo-700 mb-2">Task Description</label>
                            <textarea
                                name="taskDescription"
                                defaultValue={isEditMode ? currentTask.description : ''}
                                className={`w-full px-3 py-2 border ${formErrors.taskDescription ? 'border-red-500' : 'border-indigo-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            ></textarea>
                            {formErrors.taskDescription && <p className="text-red-500 text-sm mt-1">{formErrors.taskDescription}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-indigo-700 mb-2">Due Date</label>
                            <DateTimePicker
                                name="dueDate"
                                defaultValue={isEditMode ? dayjs(currentTask.dueDate) : dayjs()}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        className={`w-full px-3 py-2 border ${formErrors.dueDate ? 'border-red-500' : 'border-indigo-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                    />
                                )}
                            />
                            {formErrors.dueDate && <p className="text-red-500 text-sm mt-1">{formErrors.dueDate}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-indigo-700 mb-2">Priority</label>
                            <select
                                name="priority"
                                defaultValue={isEditMode ? currentTask.priority : ''}
                                className={`w-full px-3 py-2 border ${formErrors.priority ? 'border-red-500' : 'border-indigo-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            >
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            {formErrors.priority && <p className="text-red-500 text-sm mt-1">{formErrors.priority}</p>}
                        </div>
                    </>
                )}
                <div className="mb-4">
                    <label className="block text-indigo-700 mb-2">Task Status</label>
                    <select
                        name="taskStatus"
                        defaultValue={isEditMode ? currentTask.status : ''}
                        className={`w-full px-3 py-2 border ${formErrors.taskStatus ? 'border-red-500' : 'border-indigo-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    >
                        <option value="">Select Status</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    {formErrors.taskStatus && <p className="text-red-500 text-sm mt-1">{formErrors.taskStatus}</p>}
                </div>
                {isAdmin === "Admin" && (
                    <div className="mb-4">
                        <label className="block text-indigo-700 mb-2">Assign To</label>
                        <select
                            name="assignedTo"
                            defaultValue={isEditMode ? currentTask.userId : ''}
                            className={`w-full px-3 py-2 border ${formErrors.assignedTo ? 'border-red-500' : 'border-indigo-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        >
                            <option value="">Unassigned</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.email + " |  " + user.name + " | Role: " + user.role}
                                </option>
                            ))}
                        </select>
                        {formErrors.assignedTo && <p className="text-red-500 text-sm mt-1">{formErrors.assignedTo}</p>}
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
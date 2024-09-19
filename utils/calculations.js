export function calculateTaskCompletionRate(tasks) {
    if (tasks.length === 0) return 0;
    const completedTasksCount = tasks.filter((task) => task.status === 'Completed').length;
    return Math.round((completedTasksCount / tasks.length) * 100);
}

export function calculateAverageTaskDuration(tasks) {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.status === 'Completed');
    if (completedTasks.length === 0) return 0;
    const taskDurations = completedTasks.map((task) => {
        const completedAt = new Date(task.completedAt);
        const createdAt = new Date(task.createdAt);
        return completedAt - createdAt;
    });
    const totalDuration = taskDurations.reduce((acc, curr) => acc + curr, 0);
    const averageDurationInHours = (totalDuration / completedTasks.length) / (1000 * 60 * 60);
    return Math.round(averageDurationInHours * 100) / 100;
}

export function late_tasks(tasks) {
    const lateTasks = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return task.status !== "Completed" && dueDate < new Date();
    });
    return lateTasks.length;
}

export function currentUserTaskLoad(tasks, taskLoad) {
    if (tasks.length === 0) return 0;
    const notFinishedTasks = tasks.filter((task) => task.status !== 'Completed').length;
    return (notFinishedTasks / taskLoad) * 100;
}
const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    try {
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            user: req.user._id, // Get user ID from the auth middleware
        });
        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all tasks for a user with pagination
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    const pageSize = 10; // Number of tasks per page
    const page = Number(req.query.pageNumber) || 1;
    const count = await Task.countDocuments({ user: req.user._id });

    const tasks = await Task.find({ user: req.user._id })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ tasks, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Update a task's status
// @route   PUT /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res) => {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if (task) {
        task.status = status;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

// ... add logic for getTaskById, updateTask, deleteTask, getTasksByPriority, etc.
// The structure will be similar, using Mongoose methods like findById, findOneAndUpdate, findByIdAndDelete.

module.exports = { createTask, getTasks, updateTaskStatus };
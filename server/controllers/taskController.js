const Task = require('../models/Task');

const createTask = async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    if (!title || !description || !dueDate || !priority) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            user: req.user._id, // Assign the user ID from the authenticated user
        });

        const createdTask = await task.save();

        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
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

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    const { title, description, dueDate, priority, status } = req.body;
    const task = await Task.findById(req.params.id);

    if (task) {
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

// @desc    Update a task's status
// @route   PUT /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res) => {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if (task) {
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        task.status = status;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask, updateTaskStatus };
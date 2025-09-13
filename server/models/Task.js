const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assign task to a user
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                try {
                    const { data } = await axios.get(`/tasks/${id}`);
                    setTitle(data.title);
                    setDescription(data.description);
                    setDueDate(new Date(data.dueDate).toISOString().slice(0, 10));
                    setPriority(data.priority);
                } catch (error) {
                    console.error('Error fetching task', error);
                }
            };
            fetchTask();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description, dueDate, priority };
        try {
            if (id) {
                await axios.put(`/tasks/${id}`, taskData);
            } else {
                await axios.post('/tasks', taskData);
            }
            navigate('/tasks');
        } catch (error) {
            console.error('Error saving task', error);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Task' : 'Create Task'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{id ? 'Update Task' : 'Create Task'}</button>
                        <button onClick={() => navigate('/tasks')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;

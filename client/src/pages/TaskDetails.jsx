import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';

const TaskDetails = () => {
    const [task, setTask] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await axios.get(`/tasks/${id}`);
                setTask(data);
            } catch (error) {
                console.error('Error fetching task', error);
            }
        };
        fetchTask();
    }, [id]);

    if (!task) {
        return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
                <p className="text-gray-700 mb-4">{task.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="font-bold">Due Date:</div>
                    <div>{new Date(task.dueDate).toLocaleDateString()}</div>
                    <div className="font-bold">Status:</div>
                    <div>{task.status}</div>
                    <div className="font-bold">Priority:</div>
                    <div>{task.priority}</div>
                </div>
                <div className="mt-6">
                    <Link to="/tasks" className="text-blue-500 hover:underline">Back to Task List</Link>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;

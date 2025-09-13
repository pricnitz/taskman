import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Pagination from '../components/Pagination';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios.get(`/tasks?pageNumber=${page}`);
                setTasks(data.tasks);
                setPages(data.pages);
            } catch (error) {
                console.error('Error fetching tasks', error);
            }
        };
        fetchTasks();
    }, [page]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`/tasks/${id}`);
                setTasks(tasks.filter((task) => task._id !== id));
            } catch (error) {
                console.error('Error deleting task', error);
            }
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            const { data } = await axios.put(`/tasks/${id}/status`, { status });
            setTasks(tasks.map((task) => (task._id === id ? data : task)));
        } catch (error) {
            console.error('Error updating status', error);
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100';
            case 'medium':
                return 'bg-yellow-100';
            case 'low':
                return 'bg-green-100';
            default:
                return '';
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Task List</h1>
                <Link to="/tasks/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Task</Link>
            </div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Due Date</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Priority</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {tasks.map((task) => (
                            <tr key={task._id} className={`border-b border-gray-200 hover:bg-gray-100 ${getPriorityClass(task.priority)}`}>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <Link to={`/tasks/${task._id}`} className="font-medium text-blue-600 hover:text-blue-800">{task.title}</Link>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <select value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)} className="border rounded px-2 py-1">
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className={`py-1 px-3 rounded-full text-xs ${task.priority === 'high' ? 'bg-red-200 text-red-600' : task.priority === 'medium' ? 'bg-yellow-200 text-yellow-600' : 'bg-green-200 text-green-600'}`}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <Link to={`/tasks/${task._id}/edit`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
                                            </svg>
                                        </Link>
                                        <button onClick={() => handleDelete(task._id)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination page={page} pages={pages} onPageChange={setPage} />
        </div>
    );
};

export default TaskList;

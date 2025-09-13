import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96 text-center">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p className="mb-6 text-gray-600">Welcome to your task manager!</p>
                <div className="space-y-4">
                    <Link to="/tasks" className="block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">View All Tasks</Link>
                    <Link to="/tasks/new" className="block w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">Create a New Task</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

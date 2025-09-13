import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4 space-x-4">
        <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/tasks">Task List</Link>
        <Link className="bg-green-500 text-white px-4 py-2 rounded" to="/tasks/new">Create Task</Link>
      </div>
    </div>
  );
}

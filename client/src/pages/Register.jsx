import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("User registered, please login!");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input className="w-full border p-2 mb-2" placeholder="Name"
               value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full border p-2 mb-2" type="email" placeholder="Email"
               value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border p-2 mb-2" type="password" placeholder="Password"
               value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-green-500 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}

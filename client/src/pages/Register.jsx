import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios.js";
import toast from "react-hot-toast";
import { UserPlus } from "lucide-react";


export default function Register() {
    const naviagte = useNavigate();
    const [form, setForm] = useState({username: "", email: "", password: ""});
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/register", form);
            localStorage.setItem("token", res.data.token);
            naviagte("/dashboard");
            toast.success("You are Successfully Register");
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
            // toast.error(error.message);
        }
    }
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UserPlus /> Register
            </h2>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="username" placeholder="Username" required 
                    className="w-full border rounded px-3 py-2" 
                    value={form.username} onChange={handleChange}/>
                <input type="email" name="email" placeholder="Email" required 
                    className="w-full border rounded px-3 py-2"
                    value={form.email} onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" required 
                    className="w-full border rounded px-3 py-2"
                    value={form.password} onChange={handleChange}/>
                <button type="submit" className="w-full bg-blue-600 text-white py-2
                    rounded hover:bg-blue-700">Register</button>
            </form>
        </div>
    )
}
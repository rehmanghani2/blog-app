
import api from "../utils/axios.js";
import { LogIn } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export let username = null;
export default function Login() {

    const {login} = useContext(AuthContext);

    // const [username, setUsername] = useState(""); 

    const navigate = useNavigate();
    const [form, setFrom] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const handleChange = (e) => setFrom({...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await api.post("auth/login", form);
            localStorage.setItem("token", res.data.token);
            console.log("Token in login", res.data.token);
            login(res.data.token);
            // setUsername(res.data.username);
            username = res.data.username;
            navigate("/dashboard");
            console.log("Username", res.data.username);
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><LogIn />Login</h2>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" name="email" placeholder="Email" required
                    className="w-full border rounded px-3 py-2"
                    value={form.email} onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" required
                className="w-full border rounded px-3 py-2" 
                value={form.password} onChange={handleChange}/>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
            </form>
        </div>
    )
}
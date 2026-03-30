import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "https://passwordreset-be-4shg.onrender.com/api/auth/login",
                { email, password }
            );

            localStorage.setItem("token", res.data.token);

            setMessage("Login successful");

            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f5f7fa" }}>
            <div className="card shadow p-4" style={{ width: "400px", borderRadius: "12px" }}>

                <h3 className="text-center mb-4"
                    style={{fontFamily: "Limelight, sans-serif", fontWeight: "600"}}>Login</h3>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn btn-primary w-100 py-2 fw-bold">
                        Login
                    </button>
                </form>

                <div className="text-center mt-3">
                    <span
                        style={{ cursor: "pointer", fontWeight:"bold", color: "#0d6efd" }}
                        onClick={() => navigate("/register")}
                    >
                        New user? Register
                    </span>
                </div>

                <div className="text-center mt-3">
                    <span
                        style={{ cursor: "pointer",fontWeight:"bold", color: "#0d6efd" }}
                        onClick={() => navigate("/forget-password")}
                    >
                        Forgot Password?
                    </span>
                </div>

                {message && (
                    <div className="alert alert-info mt-3 text-center">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;

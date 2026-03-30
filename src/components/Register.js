import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://passwordreset-be-4shg.onrender.com/api/auth/register",
        { email, password }
      );

      setMessage(res.data.message);

      // Redirect to login after success
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f5f7fa" }}>
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "12px" }}>

        <h3 className="text-center mb-4"
          style={{ fontFamily: "Limelight, sans-serif", fontWeight: "600" }}>Register</h3>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-success w-100 py-2 fw-bold">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <span
            style={{ cursor: "pointer", color: "#0d6efd" }}
            onClick={() => navigate("/")}
          >
            Already have an account? Login
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

export default Register;

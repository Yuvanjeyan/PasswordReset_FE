import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await forgotPassword(email);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f5f7fa" }}>
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "12px" }}>

        <h3 className="text-center mb-4"
          style={{ fontFamily: "Limelight, sans-serif", fontWeight: "600" }}>Forgot Password</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn btn-primary w-100 py-2 fw-bold" >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-3">
          <span
            style={{ cursor: "pointer",fontWeight:"bold", color: "#0d6efd" }}
            onClick={() => navigate("/")}
          >
            Back to Login
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

export default ForgotPassword;
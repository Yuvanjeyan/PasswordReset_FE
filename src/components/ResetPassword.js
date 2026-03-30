import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyToken, resetPassword } from "../api/authApi";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        await verifyToken(token);
        setValid(true);
      } catch {
        setMessage("Invalid or expired link");
      }
    };

    checkToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await resetPassword(token, password);
      setMessage(res.data.message);

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f5f7fa" }}>
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "12px" }}>

        <h3 className="text-center mb-4"
          style={{ fontFamily: "Limelight, sans-serif", fontWeight: "600" }}>Reset Password</h3>

        {!valid ? (
          <div className="alert alert-danger text-center">{message}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter new password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-success w-100 py-2 fw-bold">
              Reset Password
            </button>
          </form>
        )}

        {message && valid && (
          <div className="alert alert-info mt-3 text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
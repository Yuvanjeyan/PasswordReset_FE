import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 gap-4"
      style={{
        fontFamily: "'Trade Winds', cursive",
        fontWeight: 600,
        fontSize: "40px",
      }}
    >
      <div>hello</div>

      <button
        className="btn btn-danger px-4 py-2"
        style={{ fontFamily: "inherit", fontSize: "18px" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;

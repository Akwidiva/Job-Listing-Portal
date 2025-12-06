import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <h3>My App</h3>

      {user && (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
    </nav>
  );
}

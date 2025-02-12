import "bootstrap-icons/font/bootstrap-icons.css";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-50 p-3 bg-dark text-white" style={{ width: "250px" }}>
      <h2 className="text-center mb-4">Dashboard</h2>
      <nav className="nav flex-column">
        <Link to="/dashboard" className="nav-link text-white d-flex align-items-center">
          <i className="bi bi-house-door me-2"></i> Dashboard
        </Link>
        <Link to="/profile" className="nav-link text-white d-flex align-items-center">
          <i className="bi bi-person me-2"></i> Profile
        </Link>
        <Link to="/settings" className="nav-link text-white d-flex align-items-center">
          <i className="bi bi-gear me-2"></i> Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

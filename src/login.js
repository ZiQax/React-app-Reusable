import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

const LoginForm = ({ onSubmit, errorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for checkbox
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(email, password, rememberMe);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: "90vh" }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          border: "none",
          padding: "20px",
        }}
      >
        <div className="card-body">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            {/* Floating Label for Email */}
            <div className="mb-3 form-floating">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email Address</label>
            </div>

            {/* Floating Label for Password */}
            <div className="mb-3 form-floating">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            {/* Checkbox and Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-check-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe" className="form-check-label">
                  Ingat Saya
                </label>
              </div>
              <a
                href="/#"
                className="text-muted"
                style={{
                  textDecoration: "none",
                  fontSize: "12px",
                  color: "purple",
                }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                className="alert"
                style={{
                  color: "red",
                  marginTop: "10px",
                  marginBottom: "-10px",
                  textAlign: "center",
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Login
            </button>
          </form>

          {/* Register Button */}
          <div
            className="btn btn-primary w-100 mt-3"
            style={{ backgroundColor: "#5DC9F0", border: "none" }}
          >
            <a
              href="/register"
              className="text-muted"
              style={{ textDecoration: "none", color: "#0E25ED" }}
              onClick={() => navigate("/register")}
            >
              Daftar
            </a>
          </div>

          {/* Social Login Buttons */}
          <div
            className="d-flex justify-content-center mt-4"
            style={{ gap: "10px" }}
          >
            <button
              className="btn btn-outline-danger rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px", fontSize: "18px" }}
            >
              <FaGoogle />
            </button>
            <button
              className="btn btn-outline-primary rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px", fontSize: "18px" }}
            >
              <FaFacebook />
            </button>
            <button
              className="btn btn-outline-dark rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px", fontSize: "18px" }}
            >
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

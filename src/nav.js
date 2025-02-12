import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import avatar from "./logo192.png";

const NavbarComponent = ({ links, brand, theme, isLoggedIn, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State untuk modal
  const location = useLocation(); // Hook untuk mendapatkan lokasi halaman saat ini

  // Fungsi untuk menangani toggle menu
  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fungsi untuk menampilkan modal
  const handleShowModal = () => setShowModal(true);
  // Fungsi untuk menutup modal
  const handleCloseModal = () => setShowModal(false);

  // Mengecek jika URL saat ini adalah '/login' atau '/register'
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} bg-dark`} style={{
        marginBottom: "20px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}>
      <div className="container-fluid">
        {/* Brand Section */}
        <Link className="navbar-brand" to="/">
          {brand}
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              // Jika logged-in, tampilkan links dinamis
              <>
                {links.map((link, index) => (
                  <li className="nav-item" key={index}>
                    {link.onClick ? (
                      <button
                        className="btn btn-link nav-link"
                        onClick={link.onClick}
                        aria-label={`Navigate to ${link.text}`}
                        style={{ textDecoration: "none" }}
                      >
                        {link.text}
                      </button>
                    ) : (
                      <Link className="nav-link" to={link.href} aria-label={`Navigate to ${link.text}`}>
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
                <li className="nav-item">
                  <button className="avatar-button" onClick={handleShowModal} aria-label="View Profile">
                    <img src={avatar} alt="User Avatar" />
                  </button>
                </li>
              </>
            ) : !isLoginPage && (  // Menyembunyikan tombol login dan register jika di halaman login atau register
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login" // Gunakan Link untuk navigasi
                    style={{ textDecoration: "none" }}
                    aria-label="Go to Login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register" // Gunakan Link untuk navigasi
                    style={{ textDecoration: "none" }}
                    aria-label="Go to Register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} className="user-info-modal" style={{margin:'20px'}}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && user.avatar && (
            <img
              src={user.avatar}
              alt="User Avatar"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "5px 20px auto",
                display: "block",
              }}
            />
          )}
          {user && (
            <div className="d-block">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default NavbarComponent;

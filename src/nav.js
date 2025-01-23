import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import avatar from "./logo192.png"

const NavbarComponent = ({ links, brand, theme, isLoggedIn, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State untuk modal

  // Fungsi untuk menangani toggle menu
  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fungsi untuk menampilkan modal
  const handleShowModal = () => setShowModal(true);
  // Fungsi untuk menutup modal
  const handleCloseModal = () => setShowModal(false);


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
            ) : (
              // Jika belum login, hanya tampilkan link login
              <li className="nav-item">
                <Link className="nav-link" to="/login" aria-label="Login to your account">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
          {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal} className="user-info-modal">
          <Modal.Header closeButton>
            <Modal.Title>User Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             {user && user.avatar && <img src={user.avatar} alt="User Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 10px auto', display: 'block'}} />}
              {user && (
                  <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                   </>
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
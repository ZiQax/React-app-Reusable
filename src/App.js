import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import avatar from './logo192.png';
import "./side.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import NavbarComponent from "./nav";
import LoginForm from "./login";
import RegForm from "./regist";  
import Db from "./dashboard";
import Sidebar from "./side";
import Allprod from "./allprod";
import DeskVideo from "./descvid";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);

  const navigate = useNavigate();

  // Data video untuk dashboard
  const videoData = [
    { id:"1", image: "https://via.placeholder.com/300x200?text=Video+1", title: "Belajar React untuk Pemula", rating: 4.5, price: "Rp 300K" },
    { id:"2", image: "https://via.placeholder.com/300x200?text=Video+2", title: "Advanced React Techniques", rating: 4.8, price: "Rp 500K" },
    { id:"3", image: "https://via.placeholder.com/300x200?text=Video+3", title: "React Hooks Explained", rating: 4.7, price: "Rp 400K" },
    { id:"4", image: "https://via.placeholder.com/300x200?text=Video+4", title: "Mastering JavaScript", rating: 4.9, price: "Rp 600K" },
  ];

  // Helper untuk menyimpan sesi user
  const saveUserSession = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
  };

  // Verifikasi login ketika aplikasi dimuat
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("user");

    if (storedLoginStatus === "true" && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
    }

    setIsVerifying(false);
  }, []);

  // Handle login
  const handleLoginsubmit = async (email, password) => {
    if (!email || !password) {
      setErrorMessage("Email dan password wajib diisi!");
      return false;
    }

    if (email === "admin@example.com" && password === "pass1234") {
      const user = { name: "Admin", email: email, avatar: avatar };
      saveUserSession(user);
      navigate("/dashboard");
      return true;
    } else {
      setErrorMessage("Invalid credentials");
      return false;
    }
  };

  // Handle registrasi
  const handleRegistSubmit = (email, password, phone, FirstName, LastName, countryCode, ConfirmPass) => {
    if (!email || !password || !phone || !FirstName || !LastName || !countryCode || !ConfirmPass) {
      setErrorMessage("Please fill all the fields!");
      return false;
    }

    if (password !== ConfirmPass) {
      setErrorMessage("Password dan Confirm Password tidak cocok!");
      return false;
    }

    const user = { name: `${FirstName} ${LastName}`, email: email, avatar: avatar };
    saveUserSession(user);
    navigate("/dashboard");
    return true;
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Tampilkan loading selama verifikasi
  if (isVerifying) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <NavbarComponent
        user={user}
        links={isLoggedIn ? [{ text: "Logout", onClick: handleLogout }] : [
          { text: "Login", onClick: () => navigate("/login") },
          { text: "Register", onClick: () => navigate("/register") }
        ]}
        brand={<h4>Video <span style={{ color: "orange" }}>Belajar</span></h4>}
        theme="dark"
        isLoggedIn={isLoggedIn}
        navigate={navigate}
      />

      {/* Content dan Sidebar Toggle Button */}
      <div className="d-flex">
        {isLoggedIn && showSidebar && <Sidebar />}

        <div className="flex-grow-1" style={{ padding: '0px -100px 0px' }}>
          {isLoggedIn && (
            <button
              className={`btn btn-${showSidebar ? 'danger' : 'success'} mb-3`}
              onClick={() => setShowSidebar(!showSidebar)}
              style={{ transition: 'all 0.5s ease-in-out' }}
            >
              {showSidebar ? (
                <FaArrowLeft />
              ) : (
                <FaArrowRight />
              )}
            </button>
          )}

          {/* Routes */}
          <Routes>
            {/* Ubah rute default ke /dashboard jika sudah login */}
            <Route 
              path="/" 
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
            />
            
            {/* Rute untuk halaman dashboard */}
            <Route path="/dashboard" element={isLoggedIn ? <Db videoData={videoData} /> : <Navigate to="/login" />} />
            
            {/* Rute untuk halaman produk */}
            <Route path="/allprod" element={isLoggedIn ? <Allprod videoData={videoData} /> : <Navigate to="/login" />} />
            
            {/* Rute login */}
            <Route path="/login" element={!isLoggedIn ? <LoginForm onSubmit={handleLoginsubmit} errorMessage={errorMessage} /> : <Navigate to="/dashboard" />} />
            
            {/* Rute registrasi */}
            <Route path="/register" element={!isLoggedIn ? <RegForm onSubmit={handleRegistSubmit} errorMessage={errorMessage} /> : <Navigate to="/dashboard" />} />
            <Route path="/descvid/:videoId" element={<DeskVideo videoData={videoData} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

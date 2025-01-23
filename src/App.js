import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"; // useLocation ditambahkan
import avatar from './logo192.png'

import NavbarComponent from "./nav";
import LoginForm from "./login";
import RegForm from "./regist";
import Db from "./dashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
      const [user, setUser] = useState(null)

  const navigate = useNavigate(); // Use inside the component body
  const location = useLocation(); // Dapatkan lokasi saat ini

  // Video data to be passed to the dashboard
  const videoData = [
    {
      image: "https://via.placeholder.com/300x200?text=Video+1",
      title: "Belajar React untuk Pemula",
      rating: 4.5,
      price: "Rp 300K",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Video+2",
      title: "Advanced React Techniques",
      rating: 4.8,
      price: "Rp 500K",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Video+1",
      title: "Belajar React untuk Pemula",
      rating: 4.5,
      price: "Rp 300K",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Video+2",
      title: "Advanced React Techniques",
      rating: 4.8,
      price: "Rp 500K",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Video+1",
      title: "Belajar React untuk Pemula",
      rating: 4.5,
      price: "Rp 300K",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Video+2",
      title: "Advanced React Techniques",
      rating: 4.8,
      price: "Rp 500K",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Video+1",
      title: "Belajar React untuk Pemula",
      rating: 4.5,
      price: "Rp 300K",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Video+2",
      title: "Advanced React Techniques",
      rating: 4.8,
      price: "Rp 500K",
    },
  ];

  // Periksa status login saat aplikasi dimuat
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
        const storedUser = localStorage.getItem("user")

    if (storedUser) {
         setUser(JSON.parse(storedUser))
    }

  }, []);

  // Handle login submit
  const handleLoginsubmit = async (email, password) => {
    if (email === "admin@example.com" && password === "pass1234") {
        const user = {
             name: "Admin",
        email: email,
            avatar: avatar
        }
      setIsLoggedIn(true);
         setUser(user)
       localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true"); // Simpan status login ke localStorage
      navigate("/dashboard"); // Navigate to dashboard after login
      return true;
    } else {
      setErrorMessage("Invalid credentials");
      return false;
    }
  };

  // Handle registration submit
  const handleRegistSubmit = (email, password, phone, FirstName, LastName, countryCode, ConfirmPass) => {
    if (email && password && phone && FirstName && LastName && countryCode && ConfirmPass) {
      const user = {
          name: `${FirstName} ${LastName}`,
        email: email,
           avatar: avatar
      }
        setIsLoggedIn(true);
       setUser(user)
        localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true"); // Simpan status login ke localStorage
      navigate("/dashboard"); // Navigate to dashboard after registration
      return true;
    } else {
      setErrorMessage("Please fill all the fields!");
      return false;
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Hapus status login dari localStorage
      localStorage.removeItem("user")
         setUser(null)
    navigate("/login"); // Navigate to login page
  };

  return (
    <div>
      {/* Navbar hanya tampil jika bukan di halaman login atau register */}
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <NavbarComponent
           user = {user}
          links={
            isLoggedIn
              ? [
                  {
                      text: "Logout",
                    onClick: handleLogout,
                  },
                ]
              : []
          }
          brand={
            <h4>
              Video <span style={{ color: "orange" }}>Belajar</span>
            </h4>
          }
          theme="dark"
          isLoggedIn={isLoggedIn}
        />
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
        <Route path="/login" element={<LoginForm onSubmit={handleLoginsubmit} errorMessage={errorMessage} />} />
        <Route path="/register" element={<RegForm onSubmit={handleRegistSubmit} errorMessage={errorMessage} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Db videoData={videoData} /> : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
import React, { useState } from "react";
import "./dashboard.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const Db = ({ videoData }) => {
  const [activeCategory, setActiveCategory] = useState("Semua Kelas");

  const categories = ["Semua Kelas", "Pemasaran", "Desain", "Pengembangan Diri", "Bisnis"];

  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/allprod");
  };

  const handleDeskVideo = (videoId) => {
    navigate(`/descvid/${videoId}`);
  };

  return (
    <div className="container-fluid mt-4 px-3">
      {/* Header Card for Introduction */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card header-card shadow-sm text-center text-white d-flex align-items-center justify-content-center" style={{ height: "50vh" }}>
            <div className="card-body">
              <h2 className="card-title">Welcome to Video Belajar!</h2>
              <p className="card-text">Explore our collection of high-quality video courses. Start learning today!</p>
              <button type="submit" className="btn btn-primary" onClick={handleSeeAll}>
                Lihat Semua Produk
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="category-section text-center mb-4">
        <h3 className="mb-2">Koleksi Video Pembelajaran Unggulan</h3>
        <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn btn-outline-primary ${category === activeCategory ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Video Cards */}
      <div className="row g-3 mb-5 mt-3">
        {videoData.length === 0 ? (
          <p className="text-center">Tidak ada video yang tersedia.</p>
        ) : (
          videoData.map((video) => (
            <div key={video.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch" onClick={() => handleDeskVideo(video.id)}>
              <div className="card video-card shadow-sm w-100" style={{ cursor: "pointer" }}>
                <img src={video.image} alt={video.title} className="card-img-top video-image" style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <h5 className="card-title video-title">{video.title}</h5>
                  <p className="card-text rating">⭐ Rating: {video.rating}</p>
                  <p className="card-text price font-weight-bold">💰 Price: {video.price}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="footer py-4 mt-5 bg-light text-dark text-center">
        <div className="container">
          <h2>Video Belajar</h2>
          <p>Gali Potensi Anda Melalui Pembelajaran</p>
          <p>Video di hariesok.id!</p>
          <p>JL. Usman Effendi No. 50 Lowokwaru, Malang</p>
          <div className="mt-3 d-flex flex-wrap justify-content-center gap-3">
            <a href="#" className="btn btn-outline-secondary">Tentang Kami</a>
            <a href="#" className="btn btn-outline-secondary">FAQ</a>
            <a href="#" className="btn btn-outline-secondary">Kebijakan Privasi</a>
          </div>
          <div className="footer-icons mt-3">
            <a href="#" className="me-2"><i className="fab fa-facebook"></i></a>
            <a href="#" className="me-2"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="footer-copyright mt-3">
            &copy; 2025 Video Belajar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Db;

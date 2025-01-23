import React, { useState } from "react";
import "./dashboard.css"; // Import the CSS file

const Db = ({ videoData }) => {
      const [activeCategory, setActiveCategory] = useState("Semua Kelas");

      const categories = ["Semua Kelas", "Pemasaran", "Desain", "Pengembangan Diri", "Bisnis"];

  return (
    <div
      className="mt-4 px-3" // Use px-3 for padding instead of custom padded-container
      style={{ margin: "0px 0px 0px 0px" }}
    >
      {/* Header Card for Introduction */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card header-card shadow-sm" style={{ height: "50vh" }}>
            <div className="card-body d-flex align-items-center justify-content-center" style={{color:'white'}}>
              <h2 className="card-title text-center">Welcome to Video Belajar!</h2>
              <p className="card-text text-center">
                Explore our collection of high-quality video courses. Start
                learning today!
              </p>
            </div>
          </div>
        </div>
      </div>
         {/* Category Section */}
        <div className="category-section">
            <h3 className="mb-2">Koleksi Video Pembelajaran Unggulan</h3>
            <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
             <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={category === activeCategory ? 'active' : ''}
                    onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
        </div>

      {/* Video Cards */}
      <div className="row">
        {videoData.map((video, index) => (
          <div key={index} className="col-md-4 mb-4 video-card-container">
            <div className="card video-card shadow-sm">
              <img
                src={video.image}
                alt={video.title}
                className="card-img-top video-image"
              />
              <div className="card-body text-center">
                <h5 className="card-title video-title">{video.title}</h5>
                <p className="card-text rating">Rating: {video.rating}</p>
                <p className="card-text price font-weight-bold">
                  Price: {video.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
        {/* Footer */}
        <footer className="bg-light py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h4 className="text">Video <span style={{color:"orange"}}>Belajar</span></h4>
                <p>Gali Potensi Anda Melalui Pembelajaran</p>
                <p>Video di hariesok.id!</p>
                <p>
                  JL. Usman Effendi No. 50 Lowokwaru, Malang
                </p>
                <p>
                    +62-877-7123-1234
                </p>
              </div>
              <div className="col-md-8 d-flex justify-content-between flex-wrap">
                  <div className="col-md-3">
                      <h6 className="font-weight-bold mb-3">Kategori</h6>
                      <a href="#" className="d-block text-secondary mb-2">Digital & Teknologi</a>
                      <a href="#" className="d-block text-secondary mb-2">Pemasaran</a>
                      <a href="#" className="d-block text-secondary mb-2">Manajemen Bisnis</a>
                      <a href="#" className="d-block text-secondary mb-2">Pengembangan Diri</a>
                      <a href="#" className="d-block text-secondary mb-2">Desain</a>
                  </div>
                  <div className="col-md-3">
                      <h6 className="font-weight-bold mb-3">Perusahaan</h6>
                      <a href="#" className="d-block text-secondary mb-2">Tentang Kami</a>
                      <a href="#" className="d-block text-secondary mb-2">FAQ</a>
                      <a href="#" className="d-block text-secondary mb-2">Kebijakan Privasi</a>
                      <a href="#" className="d-block text-secondary mb-2">Ketentuan Layanan</a>
                      <a href="#" className="d-block text-secondary mb-2">Bantuan</a>
                  </div>
                  <div className="col-md-3">
                    <h6 className="font-weight-bold mb-3">Komunitas</h6>
                    <a href="#" className="d-block text-secondary mb-2">Tips Sukses</a>
                    <a href="#" className="d-block text-secondary mb-2">Blog</a>
                  </div>
              </div>
            </div>
              <div className="text-center mt-4">
                  <div className="text-muted small">©2023 Gerobek Sayur All Rights Reserved.</div>
                  <div className="footer-icons mt-2">
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-facebook-square"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                  </div>
              </div>
          </div>
        </footer>
    </div>
  );
};

export default Db;
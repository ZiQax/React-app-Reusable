import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBook, FaTags, FaClock, FaFilter } from "react-icons/fa";
import Video from "./video";
import "./allprod.css";

const Allprod = ({ videoData }) => {
  const [filteredVideos, setFilteredVideos] = useState(videoData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [sortOption, setSortOption] = useState("Harga Rendah");
  const [showFilters, setShowFilters] = useState(false);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedPrice(null);
    setSelectedDuration(null);
    setSortOption("Harga Rendah");
    setFilteredVideos(videoData);
  };

  useEffect(() => {
    let filtered = videoData.filter((video) => {
      return (
        (!selectedCategory || video.category === selectedCategory) &&
        (!selectedPrice || video.priceRange === selectedPrice) &&
        (!selectedDuration || video.duration === selectedDuration) &&
        (!searchQuery || video.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

    if (sortOption === "Harga Rendah") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Harga Tinggi") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Rating Tertinggi") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredVideos(filtered);
  }, [searchQuery, selectedCategory, selectedPrice, selectedDuration, sortOption, videoData]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Koleksi Video Pembelajaran</h2>

      <button className="btn btn-primary d-md-none mb-3" onClick={() => setShowFilters(!showFilters)}>
        <FaFilter /> Filter
      </button>

      <div className="row">
        <div className={`col-md-3 ${showFilters ? "d-block" : "d-none d-md-block"}`}>
          <div className="sidebar p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Filter</h5>
              <button className="btn btn-sm btn-outline-danger" onClick={resetFilters}>
                Reset
              </button>
            </div>
            <hr />
            <div className="mb-3" style={{ cursor: "pointer" }}>
              <h6><FaBook /> Bidang Studi</h6>
              {["Pemasaran", "Digital & Teknologi", "Bisnis Manajemen"].map((category) => (
                <div key={category} className={`filter-icon ${selectedCategory === category ? "active" : ""}`} onClick={() => setSelectedCategory(category)}>
                  <span>{category}</span>
                </div>
              ))}
            </div>
            <div className="mb-3" style={{ cursor: "pointer" }}>
              <h6><FaTags /> Harga</h6>
              {["Rp 100K - 200K", "Rp 200K - 300K"].map((priceRange) => (
                <div key={priceRange} className={`filter-icon ${selectedPrice === priceRange ? "active" : ""}`} onClick={() => setSelectedPrice(priceRange)}>
                  <span>{priceRange}</span>
                </div>
              ))}
            </div>
            <div className="mb-3" style={{ cursor: "pointer" }}>
              <h6><FaClock /> Durasi</h6>
              {["Kurang dari 1 Jam", "1 - 2 Jam", "Lebih dari 2 Jam"].map((duration) => (
                <div key={duration} className={`filter-icon ${selectedDuration === duration ? "active" : ""}`} onClick={() => setSelectedDuration(duration)}>
                  <span>{duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="sorting-search d-flex flex-column flex-md-row justify-content-between mb-3">
            <select className="form-control mb-2 mb-md-0" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option>Harga Rendah</option>
              <option>Harga Tinggi</option>
              <option>Rating Tertinggi</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Cari Kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="video-container">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
                <div key={index} className="video-card">
                  <Video video={video} />
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allprod;

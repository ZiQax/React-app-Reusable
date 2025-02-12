import React from "react";
import "./allprod.css";

const Video = ({ video }) => {
    return (
        <div className="col-md-4 mb-4 video-card-container">
            <div className="card video-card shadow-sm">
                <img src={video.image} alt={video.title} className="card-img-top video-image" />
                <div className="card-body text-center">
                  <h5 className="card-title video-title">{video.title}</h5>
                  <p className="card-text rating">Rating: {video.rating}</p>
                  <p className="card-text price font-weight-bold">Price: {video.price}</p>
                </div>
            </div>
        </div>    
    );
};

export default Video;

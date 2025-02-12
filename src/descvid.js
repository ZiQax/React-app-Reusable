import React from "react";
import { useParams } from "react-router-dom";
import { ProgressBar, Button, Card, ListGroup, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./allprod.css";

const DeskVideo = ({ videoData }) => {
  const { videoId } = useParams(); // Ambil ID dari URL

  console.log("videoId dari URL:", videoId);
  console.log("Data video tersedia:", videoData);

  // Pastikan ID yang dicari adalah string agar sesuai dengan useParams()
  const video = videoData.find(v => String(v.id) === videoId);

  if (!video) {
    return <div className="text-center mt-5">⚠ Video tidak ditemukan.</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "100vw", width: "100%", height: "70vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h5>{video.title}</h5>
        <div className="d-flex align-items-center">
          <ProgressBar now={0} label={`10/12`} className="me-2" style={{ width: "150px" }} />
          <img src="https://via.placeholder.com/40" alt="User" className="rounded-circle" />
        </div>
      </div>

      {/* Konten Video */}
      <Row>
        {/* Player Video */}
        <Col md={7}>
          <Card className="mb-3">
            <div className="text-center p-5 bg-dark text-light" style={{ height: "300px" }}>
              {video.videoUrl ? (
                <video controls width="100%">
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={video.image} alt={video.title} className="card-img-top" />
              )}
            </div>
            <Card.Body>
              <Card.Title>{video.title}</Card.Title>
              <Card.Text>{video.description}</Card.Text>
              <Card.Text>⭐ Rating: {video.rating}</Card.Text>
              <Card.Text>💰 Harga: {video.price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Daftar Video */}
        <Col md={3}>
          <Card>
            <ListGroup variant="flush" className="p-3">
              <ListGroup.Item style={{cursor: "pointer"}}>📹 Video: Introduction to HR - 12 Menit</ListGroup.Item>
              <ListGroup.Item>📹 Video: Understanding User Research - 15 Menit</ListGroup.Item>
              <ListGroup.Item>📹 Video: UX Design Process - 20 Menit</ListGroup.Item>
              <ListGroup.Item>📑 Ringkasan: UX Design Basics</ListGroup.Item>
              <ListGroup.Item>❓ Quiz: UX Design - 10 Pertanyaan</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Review & Rating */}
      <div className="text-center mt-3">
        <Button variant="warning">⭐ Beri Review & Rating</Button>
      </div>
    </div>
  );
};

export default DeskVideo;

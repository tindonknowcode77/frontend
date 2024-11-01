import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../config/axios';
import OrchidFeedback from './OrchidFeedback';
import FeedbackList from './FeedbackList';

function Detail() {
  const [orchid, setOrchid] = useState(null);
  const { id } = useParams();

  const fetchOrchidDetails = async () => {
    try {
      const response = await api.get(`/orchids/${id}`);
      setOrchid(response.data);
    } catch (error) {
      console.error('Error fetching orchid details:', error);
    }
  };

  useEffect(() => {
    fetchOrchidDetails();
  }, [id]);

  if (!orchid) return <div>Loading...</div>;

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Img
              variant="top"
              src={orchid.image}
              alt={orchid.name}
              className="img-fluid"
            />
          </Card>
        </Col>
        <Col md={6}>
          <h2 className="mb-4">{orchid.name}</h2>
          <div className="mb-3">
            <strong>Xuất xứ:</strong> {orchid.origin}
          </div>
          <div className="mb-3">
            <strong>Màu sắc:</strong> {orchid.color}
          </div>
          <div className="mb-3">
            <strong>Danh mục:</strong> {orchid.category}
          </div>
          <div className="mb-3">
            <strong>Đánh giá trung bình:</strong> {orchid.rating.toFixed(1)}/5
          </div>
          {orchid.clip && (
            <div className="mb-3">
              <iframe
                width="100%"
                height="315"
                src={orchid.clip}
                title={orchid.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <FeedbackList feedbacks={orchid.feedback || []} />
          <OrchidFeedback 
            orchidId={id} 
            onFeedbackSubmitted={fetchOrchidDetails}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Detail; 
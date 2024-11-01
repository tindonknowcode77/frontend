import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="mt-4">
      <h4>Đánh giá và Bình luận</h4>
      {feedbacks.length === 0 ? (
        <p>Chưa có đánh giá nào.</p>
      ) : (
        feedbacks.map((feedback, index) => (
          <Card key={index} className="mb-3 shadow-sm">
            <Card.Body>
              <Row>
                <Col>
                  <div className="d-flex align-items-center mb-2">
                    <div className="me-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < feedback.rating ? 'text-warning' : 'text-muted'}
                        />
                      ))}
                    </div>
                    <span className="text-muted">({feedback.rating}/5)</span>
                  </div>
                  <p className="mb-1">{feedback.comment}</p>
                  <small className="text-muted">
                    Bởi: {feedback.author}
                    <br />
                    Ngày: {new Date(feedback.date).toLocaleDateString('vi-VN')}
                  </small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default FeedbackList; 
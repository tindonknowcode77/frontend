import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import api from '../config/axios';

const OrchidFeedback = ({ orchidId, onFeedbackSubmitted }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/orchids/${orchidId}/feedback`, {
        rating: Number(rating),
        comment
      });
      setSuccess('Phản hồi của bạn đã được gửi thành công!');
      setComment('');
      setRating(5);
      if (onFeedbackSubmitted) onFeedbackSubmitted();
    } catch (error) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra khi gửi phản hồi');
    }
  };

  if (!user) {
    return <Alert variant="info">Vui lòng đăng nhập để gửi phản hồi</Alert>;
  }

  return (
    <div className="mt-4">
      <h4>Gửi phản hồi của bạn</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Đánh giá</Form.Label>
          <Form.Select 
            value={rating} 
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">5 sao</option>
            <option value="4">4 sao</option>
            <option value="3">3 sao</option>
            <option value="2">2 sao</option>
            <option value="1">1 sao</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bình luận</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Nhập bình luận của bạn..."
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Gửi phản hồi
        </Button>
      </Form>
    </div>
  );
};

export default OrchidFeedback; 
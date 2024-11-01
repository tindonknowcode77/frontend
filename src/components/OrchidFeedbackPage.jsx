import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import api from '../config/axios';
import FeedbackList from './FeedbackList';
import OrchidFeedback from './OrchidFeedback';
import { toast } from 'react-toastify';

function OrchidFeedbackPage() {
  const [orchids, setOrchids] = useState([]);
  const [selectedOrchid, setSelectedOrchid] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useAuth();

  // Fetch orchids
  useEffect(() => {
    const fetchOrchids = async () => {
      try {
        const response = await api.get('/orchids');
        setOrchids(response.data);
      } catch (error) {
        toast.error('Không thể tải danh sách hoa lan');
      }
    };
    fetchOrchids();
  }, []);

  // Lọc danh sách hoa lan
  const filteredOrchids = orchids.filter(orchid => {
    const matchesSearch = orchid.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || orchid.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Lấy danh sách category
  const categories = [...new Set(orchids.map(orchid => orchid.category))];

  // Xử lý khi feedback được gửi thành công
  const handleFeedbackSubmitted = () => {
    toast.success('Cảm ơn bạn đã gửi đánh giá!');
    // Refresh danh sách orchids
    const fetchOrchids = async () => {
      const response = await api.get('/orchids');
      setOrchids(response.data);
    };
    fetchOrchids();
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Đánh Giá Hoa Lan</h2>
      
      {/* Search và Filter */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Tìm kiếm theo tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên hoa lan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Lọc theo danh mục</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Danh sách hoa lan */}
      <Row>
        {filteredOrchids.map((orchid) => (
          <Col md={6} lg={4} key={orchid._id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={orchid.image} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{orchid.name}</Card.Title>
                <div className="mb-3">
                  <small className="text-muted">
                    Danh mục: {orchid.category}
                  </small>
                  <br />
                  <small className="text-muted">
                    Đánh giá trung bình: {orchid.rating.toFixed(1)}/5
                  </small>
                </div>

                {/* Hiển thị feedback cho hoa lan này */}
                <FeedbackList feedbacks={orchid.feedback || []} />
                
                {/* Form gửi feedback */}
                {user && (
                  <OrchidFeedback
                    orchidId={orchid._id}
                    onFeedbackSubmitted={handleFeedbackSubmitted}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Thông báo khi không có kết quả */}
      {filteredOrchids.length === 0 && (
        <div className="text-center py-5">
          <h4>Không tìm thấy hoa lan phù hợp</h4>
        </div>
      )}
    </Container>
  );
}

export default OrchidFeedbackPage; 
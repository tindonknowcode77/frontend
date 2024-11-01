import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import api from '../config/axios';
import FeedbackList from './FeedbackList';
import OrchidFeedback from './OrchidFeedback';
import { toast } from 'react-toastify';
import OrchidFeedbackPage from './components/OrchidFeedbackPage';

function App() {
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
    <AuthContextProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={1500} />
        <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          {/* ... existing routes ... */}
          <Route 
            path="/feedback" 
            element={
              <ProtectedRoute>
                <OrchidFeedbackPage isDarkMode={isDarkMode} />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </Router>
    </AuthContextProvider>
  );
} 
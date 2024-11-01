import express from 'express';
import { checkMember } from '../middleware/authMiddleware';
import {
  getAllOrchids,
  getOrchidById,
  searchOrchids,
  filterOrchidsByCategory,
  postFeedback,
  getFeedbackByOrchidId,
} from '../controllers/orchidController';

const router = express.Router();

// Public routes
router.get('/orchids', getAllOrchids); // Get all orchids
router.get('/orchids/:id', getOrchidById); // Get orchid details
router.get('/orchids/search', searchOrchids); // Search orchids by name
router.get('/orchids/filter', filterOrchidsByCategory); // Filter orchids by category
router.post('/orchids/:id/feedback', checkMember, postFeedback); // Post feedback for an orchid
router.get('/orchids/:id/feedback', getFeedbackByOrchidId); // Get feedback for an orchid

export default router; 
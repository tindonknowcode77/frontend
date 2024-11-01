import express from 'express';
import { checkAdmin } from '../middleware/authMiddleware';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  createOrchid,
  updateOrchid,
  deleteOrchid,
  getAllOrchidsAdmin,
} from '../controllers/adminController';

const router = express.Router();

// Admin routes for categories
router.get('/categories', checkAdmin, getAllCategories);
router.get('/categories/:id', checkAdmin, getCategoryById);
router.post('/categories', checkAdmin, createCategory);
router.put('/categories/:id', checkAdmin, updateCategory);
router.delete('/categories/:id', checkAdmin, deleteCategory);

// Admin routes for orchids
router.get('/orchids', checkAdmin, getAllOrchidsAdmin);
router.post('/orchids', checkAdmin, createOrchid);
router.put('/orchids/:id', checkAdmin, updateOrchid);
router.delete('/orchids/:id', checkAdmin, deleteOrchid);

export default router; 
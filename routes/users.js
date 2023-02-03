import express from 'express';
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// read
router.get('/:id', verifyToken, getUser);
router.get('/', getAllUsers);
router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);
export default router;

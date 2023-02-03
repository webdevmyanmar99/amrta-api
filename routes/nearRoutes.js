import express from 'express';
import { getNearPlaces } from '../controllers/nearPlace.js';
import { getAllNearPlaces } from '../controllers/nearPlace.js';
import { addNearPlace } from '../controllers/nearPlace.js';
const router = express.Router();

router.get('/:longitude/:latitude', getNearPlaces);

router.post('/', addNearPlace);

router.get('/', getAllNearPlaces);

export default router;

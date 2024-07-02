import express from 'express';
import { createReview } from '../controllers/review.controller.js';

const router = express.Router();

/**
 * @swagger
 * /review/add:
 *   post:
 *     summary: Add a new review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Great place!
 *               rating:
 *                 type: integer
 *                 example: 5
 *               storeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Review added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/add', createReview);

export default router;
import express from 'express';
import { createChallenge } from '../controllers/challenge.controller.js';

const router = express.Router();

/**
 * @swagger
 * /challenge/add:
 *   post:
 *     summary: Add a new challenge
 *     tags: [Challenge]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               missionId:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: in progress
 *     responses:
 *       201:
 *         description: Challenge added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/add', createChallenge);

export default router;
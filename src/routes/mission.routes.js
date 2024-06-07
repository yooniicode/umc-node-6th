import express from 'express';
import { createMission } from '../controllers/mission.controller.js';

const router = express.Router();

/**
 * @swagger
 * /mission/add:
 *   post:
 *     summary: Add a new mission
 *     tags: [Mission]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Complete this task
 *               storeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Mission added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/add', createMission);

export default router;

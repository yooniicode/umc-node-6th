import express from 'express';
import { createStore } from '../controllers/store.controller.js';

const router = express.Router();

/**
 * @swagger
 * /store/add:
 *   post:
 *     summary: Add a new store
 *     tags: [Store]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: MyStore
 *               address:
 *                 type: string
 *                 example: 123 MyStreet
 *               region:
 *                 type: string
 *                 example: MyRegion
 *     responses:
 *       201:
 *         description: Store added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/add', createStore);

export default router;

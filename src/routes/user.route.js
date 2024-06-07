import express from 'express';
import { userSignin, userLogin } from '../controllers/user.controller.js';

const router = express.Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               name:
 *                 type: string
 *                 example: John Doe
 *               birthYear:
 *                 type: integer
 *                 example: 1990
 *               birthMonth:
 *                 type: integer
 *                 example: 1
 *               birthDay:
 *                 type: integer
 *                 example: 1
 *               gender:
 *                 type: string
 *                 example: M
 *               addr:
 *                 type: string
 *                 example: Seoul
 *               specAddr:
 *                 type: string
 *                 example: Gangnam
 *               phone:
 *                 type: string
 *                 example: 010-1234-5678
 *               prefer:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/signup', userSignin);

/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/signin', userLogin);

export default router;

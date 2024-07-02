import express from 'express';
import { userSignin, userLogin, userReviewPreview } from '../controllers/user.controller.js';
import expressAsyncHandler from "express-async-handler";

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


/**
 * @swagger
 * /user/{userId}/reviews:
 *   get:
 *     tags:
 *       - User
 *     summary: 내가 작성한 리뷰 목록 조회
 *     parameters:
 *       - name: userId
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *       - name: cursorId
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *       - name: size
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 3
 *     responses:
 *       '200':
 *         description: 리뷰 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: integer
 *                   example: 2000
 *                 message:
 *                   type: string
 *                   example: "success!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     reviewData:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user_name:
 *                             type: string
 *                           rate:
 *                             type: number
 *                           review_body:
 *                             type: string
 *                           create_date:
 *                             type: string
 *                             format: date
 *                       example:
 *                         - user_name: "SwaggerTest1"
 *                           rate: 5
 *                           review_body: "리뷰1"
 *                           create_date: "2000.01.01"
 *                         - user_name: "SwaggerTest2"
 *                           rate: 4.5
 *                           review_body: "리뷰2"
 *                           create_date: "2000.02.02"
 *                     cursorId:
 *                       type: integer
 *                       example: 1
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: string
 *                   example: COMMON001
 *                 message:
 *                   type: string
 *                   example: 잘못된 요청입니다
 *       '500':
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: string
 *                   example: COMMON000
 *                 message:
 *                   type: string
 *                   example: 서버 에러, 관리자에게 문의 바랍니다.
 */
router.get('/:userId/reviews', expressAsyncHandler(userReviewPreview));

/**
 * @swagger
 * /user/{userId}/missions:
 *   get:
 *     tags:
 *       - User
 *     summary: 내가 진행중인 미션 목록 조회
 *     parameters:
 *       - name: userId
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: 진행중인 미션 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: integer
 *                   example: 2000
 *                 message:
 *                   type: string
 *                   example: "success!"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       content:
 *                         type: string
 *                       location:
 *                         type: string
 *                       is_start:
 *                         type: boolean
 *                       is_complete:
 *                         type: boolean
 *                       deadline:
 *                         type: integer
 *                       serial_number:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                   example:
 *                     - id: 1
 *                       content: "Mission 1"
 *                       location: "Location 1"
 *                       is_start: true
 *                       is_complete: false
 *                       deadline: 1622517800
 *                       serial_number: 123
 *                       created_at: "2022-01-01T00:00:00Z"
 *                     - id: 2
 *                       content: "Mission 2"
 *                       location: "Location 2"
 *                       is_start: true
 *                       is_complete: false
 *                       deadline: 1622517800
 *                       serial_number: 124
 *                       created_at: "2022-02-01T00:00:00Z"
 *       '400':
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: string
 *                   example: COMMON001
 *                 message:
 *                   type: string
 *                   example: 잘못된 요청입니다
 *       '500':
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 isSuccess:
 *                   type: boolean
 *                   example: false
 *                 code:
 *                   type: string
 *                   example: COMMON000
 *                 message:
 *                   type: string
 *                   example: 서버 에러, 관리자에게 문의 바랍니다.
 */
router.get('/:userId/missions', expressAsyncHandler(userMissions));

module.exports = router;
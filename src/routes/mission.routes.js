import express from 'express';
import { createMission } from '../controllers/mission.controller.js';
import expressAsyncHandler from "express-async-handler";

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

const missionRouter = express.Router();

/**
 * @swagger
 * /missions/{missionId}/complete:
 *   patch:
 *     tags:
 *       - Mission
 *     summary: 진행중인 미션 완료로 변경
 *     parameters:
 *       - name: missionId
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: 미션 완료로 변경 성공
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
 *                     id:
 *                       type: integer
 *                     is_complete:
 *                       type: boolean
 *                   example:
 *                     id: 1
 *                     is_complete: true
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
missionRouter.patch('/:missionId/complete', expressAsyncHandler(completeMission));


export default router;

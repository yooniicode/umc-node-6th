import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import SwaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.config.js';

import tempRouter from './src/routes/temp.routes.js';
import userRouter from './src/routes/user.route.js';
import storeRouter from './src/routes/store.route.js';
import reviewRouter from './src/routes/review.routes.js';
import missionRouter from './src/routes/mission.routes.js';
import challengeRouter from './src/routes/challenge.routes.js';
import { response } from './config/response.js';
import { status } from './config/response.status.js';

dotenv.config();    // .env 파일 사용 (환경 변수 관리)

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());                            // CORS 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // JSON 형태의 요청 본문 파싱
app.use(express.urlencoded({extended: false})); // URL-encoded 데이터 파싱

// 라우터 설정
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));
app.use('/store', storeRouter);
app.use('/review', reviewRouter);
app.use('/mission', missionRouter);
app.use('/challenge', challengeRouter);
app.use('/user', userRouter);

app.use('/temp', tempRouter);
app.use('/user', userRouter);
app.use('/:storeId', storeRouter);

pool.getConnection()
    .then(connection => {
        console.log('Database connection successful!');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    console.log("error", err);
    res.status(err.data?.status || status.INTERNAL_SERVER_ERROR.status).send(response(status.INTERNAL_SERVER_ERROR, null));
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;

// index.js
import express from 'express';
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import cors from 'cors';

import { response } from './config/response.js';
import { BaseError } from './config/error.js';
import { status } from './config/response.status.js';
import { healthRoute } from './src/routes/health.route.js';

import tempRouter from './src/routes/temp.route.js';
import userRouter from './src/routes/user.route.js';
import storeRouter from './src/routes/store.route.js';
import reviewRouter from './src/routes/review.route.js';
import missionRouter from './src/routes/mission.route.js';
import challengeRouter from './src/routes/challenge.route.js';

dotenv.config();    // .env 파일 사용 (환경 변수 관리)

const app = express();

// server setting - veiw, static, body-parser etc..
app.set('port', process.env.PORT || 3000)   // 서버 포트 지정
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));
app.use('/store', storeRouter);
app.use('/review', reviewRouter);
app.use('/mission', missionRouter);
app.use('/challenge', challengeRouter);
app.use('/user', userRouter);

app.use('/temp', tempRouter);
app.use('/user', userRouter);
app.use('/:storeId', storeRouter);
app.use('/health', healthRoute);

app.get('/', (req, res, next) => {
    res.send(response(status.SUCCESS, "루트 페이지!"));
})

// error handling
app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    console.error(err);
    res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
});

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});

app.use('/health', healthRoute);

app.get('/', (req, res, next) => {
    res.send(response(status.SUCCESS, "루트 페이지!"));
})

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
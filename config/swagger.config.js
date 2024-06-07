import SwaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'UMC Study API',
            version: '1.0.0',
            description: '🚨 Feature 5까지 반영완료'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            }
        ]
    },
    apis: ['src/routes/*.js'], // 라우트 파일의 위치
};

export const specs = SwaggerJsdoc(options);

import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { connectFoodCategory, confirmEmail, getUserID, insertUserSql, getPreferToUserID } from "./user.sql.js";

// User 데이터 삽입
export const addUser = async (data) => {
    try {
        const conn = await pool.getConnection();

        const [confirm] = await conn.query(confirmEmail, [data.email]);

        if (confirm[0].isExistEmail) {
            conn.release();
            return -1;
        }

        const result = await conn.query(insertUserSql, [data.email, data.name, data.gender, data.birth, data.addr, data.specAddr, data.phone]);

        conn.release();
        return result[0].insertId;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자 정보 얻기
export const getUser = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await conn.query(getUserID, [userId]);

        console.log(user);

        if (user.length === 0) {
            return -1;
        }

        conn.release();
        return user;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 음식 선호 카테고리 매핑
export const setPrefer = async (userId, foodCategoryId) => {
    try {
        const conn = await pool.getConnection();

        await conn.query(connectFoodCategory, [foodCategoryId, userId]);

        conn.release();
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자 선호 카테고리 반환
export const getUserPreferToUserID = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [prefer] = await conn.query(getPreferToUserID, [userId]);

        conn.release();

        return prefer;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

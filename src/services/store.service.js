import { pool } from '../../config/db.config.js';
import {previewReviewResponseDTO} from "../dtos/store.dto.js";
import {getPreviewReview} from "../models/store.dao.js";


export const addStore = async (storeData) => {
    const { name, address, region } = storeData;
    const [result] = await pool.query('INSERT INTO stores (name, address, region) VALUES (?, ?, ?)', [name, address, region]);
    return result.insertId;
};

export const getStoreById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM stores WHERE id = ?', [id]);
    return rows[0];
};

export const getReview = async (storeId, query) => {
    const {reviewId, size = 3} = query;
    return previewReviewResponseDTO(await getPreviewReview(reviewId, size, storeId));
}

const getStoreMissions = async (storeId) => {
    const data = await getStoreMissionList(storeId);
    return missionResponseDTO(data);
}
import { pool } from '../../config/db.config.js';

export const addReview = async (reviewData) => {
    const { content, rating, storeId } = reviewData;
    const [result] = await pool.query('INSERT INTO reviews (content, rating, store_id) VALUES (?, ?, ?)', [content, rating, storeId]);
    return result.insertId;
};

export const getReviewById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ?', [id]);
    return rows[0];
};

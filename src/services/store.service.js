import { pool } from '../../config/db.config.js';

export const addStore = async (storeData) => {
    const { name, address, region } = storeData;
    const [result] = await pool.query('INSERT INTO stores (name, address, region) VALUES (?, ?, ?)', [name, address, region]);
    return result.insertId;
};

export const getStoreById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM stores WHERE id = ?', [id]);
    return rows[0];
};

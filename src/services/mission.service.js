import { pool } from '../../config/db.config.js';

export const addMission = async (missionData) => {
    const { description, storeId } = missionData;
    const [result] = await pool.query('INSERT INTO missions (description, store_id) VALUES (?, ?)', [description, storeId]);
    return result.insertId;
};

export const getMissionById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM missions WHERE id = ?', [id]);
    return rows[0];
};

const completeUserMission = async (missionId) => {
    const data = await updateMissionCompleteStatus(missionId);
    return missionCompleteResponseDTO(data);
}

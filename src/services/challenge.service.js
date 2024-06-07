import { pool } from '../../config/db.config.js';

export const addChallenge = async (challengeData) => {
    const { userId, missionId, status } = challengeData;
    const [result] = await pool.query('INSERT INTO challenges (user_id, mission_id, status) VALUES (?, ?, ?)', [userId, missionId, status]);
    return result.insertId;
};

export const getChallengeById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM challenges WHERE id = ?', [id]);
    return rows[0];
};

export const checkChallengeExists = async (challengeData) => {
    const { userId, missionId } = challengeData;
    const [rows] = await pool.query('SELECT * FROM challenges WHERE user_id = ? AND mission_id = ?', [userId, missionId]);
    return rows.length > 0;
};

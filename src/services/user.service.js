import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { signinResponseDTO, previewReviewResponseDTO, missionResponseDTO } from "../dtos/user.dto.js";
import { addUser, getUser, getUserPreferToUserID, setPrefer, getUserPreviewReview, getUserActiveMissions } from "../models/user.dao.js";

export const joinUser = async (body) => {
    const birth = new Date(body.birthYear, body.birthMonth, body.birthDay);
    const prefer = body.prefer;

    const joinUserData = await addUser({
        'email': body.email,
        'name': body.name,
        'gender': body.gender,
        'birth': birth,
        'addr': body.addr,
        'specAddr': body.specAddr,
        'phone': body.phone
    });

    if (joinUserData == -1) {
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    } else {
        for (let i = 0; i < prefer.length; i++) {
            await setPrefer(joinUserData, prefer[i]);
        }
        return signinResponseDTO(await getUser(joinUserData), await getUserPreferToUserID(joinUserData));
    }
};

export const signInUser = async (userData) => {
    const { email, password } = userData;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (rows.length > 0) {
        return rows[0];
    }
    throw new Error('Invalid credentials');
};

const getUserReviews = async (userId, query) => {
    const { cursorId, size = 3 } = query;
    const data = await getUserPreviewReview(userId, size, cursorId);
    return previewReviewResponseDTO(data);
}

const getUserMissions = async (userId) => {
    const data = await getUserActiveMissions(userId);
    return missionResponseDTO(data);
}
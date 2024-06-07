// src/dtos/challenge.dto.js

// Challenge creation request DTO
export class CreateChallengeDto {
    constructor({ userId, missionId, status }) {
        this.userId = userId;
        this.missionId = missionId;
        this.status = status;
    }

    validate() {
        if (!this.userId || !this.missionId || !this.status) {
            throw new Error('Invalid challenge data');
        }
    }
}

// Challenge response DTO
export const challengeResponseDTO = (challenge) => {
    return {
        id: challenge.id,
        userId: challenge.userId,
        missionId: challenge.missionId,
        status: challenge.status
    };
}

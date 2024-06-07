// src/dtos/mission.dto.js

// Mission creation request DTO
export class CreateMissionDto {
    constructor({ description, storeId }) {
        this.description = description;
        this.storeId = storeId;
    }

    validate() {
        if (!this.description || !this.storeId) {
            throw new Error('Invalid mission data');
        }
    }
}

// Mission response DTO
export const missionResponseDTO = (mission) => {
    return {
        id: mission.id,
        description: mission.description,
        storeId: mission.storeId
    };
}

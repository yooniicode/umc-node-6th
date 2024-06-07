import { addMission, getMissionById } from '../services/mission.service.js';
import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { CreateMissionDto, missionResponseDTO } from '../dtos/mission.dto.js';

export const createMission = async (req, res) => {
    try {
        const createMissionDto = new CreateMissionDto(req.body);
        createMissionDto.validate();
        const missionId = await addMission(createMissionDto);
        const mission = await getMissionById(missionId);
        res.status(201).json(response(status.SUCCESS, missionResponseDTO(mission)));
    } catch (error) {
        res.status(500).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
};

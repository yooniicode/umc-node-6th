import { addChallenge, getChallengeById, checkChallengeExists } from '../services/challenge.service.js';
import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { CreateChallengeDto, challengeResponseDTO } from '../dtos/challenge.dto.js';

export const createChallenge = async (req, res) => {
    try {
        const createChallengeDto = new CreateChallengeDto(req.body);
        createChallengeDto.validate();
        const challengeExists = await checkChallengeExists(createChallengeDto);
        if (challengeExists) {
            return res.status(400).json(response(status.BAD_REQUEST, null));
        }
        const challengeId = await addChallenge(createChallengeDto);
        const challenge = await getChallengeById(challengeId);
        res.status(201).json(response(status.SUCCESS, challengeResponseDTO(challenge)));
    } catch (error) {
        res.status(500).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
};
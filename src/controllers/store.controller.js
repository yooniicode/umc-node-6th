import { addStore, getStoreById } from '../services/store.service.js';
import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { CreateStoreDto, storeResponseDTO } from '../dtos/store.dto.js';

export const createStore = async (req, res) => {
    try {
        const createStoreDto = new CreateStoreDto(req.body);
        createStoreDto.validate();
        const storeId = await addStore(createStoreDto);
        const store = await getStoreById(storeId);
        res.status(201).json(response(status.SUCCESS, storeResponseDTO(store)));
    } catch (error) {
        res.status(500).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
};

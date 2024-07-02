import { addStore, getStoreById, getReview } from '../services/store.service.js';
import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { CreateStoreDto, storeResponseDTO } from '../dtos/store.dto.js';

export const addReview = async (req, res, next) => {
    console.log("body", req.body);
    console.log("files", req.file);

    res.send(response(status.SUCCESS, await registReview(req.params.storeId, req.body)));
}

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

export const reviewPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await getReview(req.params.storeId, req.query)));
}

const storeMissions = async (req, res, next) => {
    const missions = await getStoreMissions(req.params.storeId);
    return res.send(response(status.SUCCESS, missions));
}

module.exports = { reviewPreview, storeMissions };
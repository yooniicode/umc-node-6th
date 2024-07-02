import { addReview, getReviewById } from '../services/review.service.js';
import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { CreateReviewDto, reviewResponseDTO } from '../dtos/review.dto.js';

export const createReview = async (req, res) => {
    try {
        const createReviewDto = new CreateReviewDto(req.body);
        createReviewDto.validate();
        const reviewId = await addReview(createReviewDto);
        const review = await getReviewById(reviewId);
        res.status(201).json(response(status.SUCCESS, reviewResponseDTO(review)));
    } catch (error) {
        res.status(500).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
};
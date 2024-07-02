// src/dtos/review.dto.js

// Review creation request DTO
export class CreateReviewDto {
    constructor({ content, rating, storeId }) {
        this.content = content;
        this.rating = rating;
        this.storeId = storeId;
    }

    validate() {
        if (!this.content || !this.rating || !this.storeId) {
            throw new Error('Invalid review data');
        }
    }
}

// Review response DTO
export const reviewResponseDTO = (review) => {
    return {
        id: review.id,
        content: review.content,
        rating: review.rating,
        storeId: review.storeId
    };
}
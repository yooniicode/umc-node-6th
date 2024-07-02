// src/dtos/store.dto.js

// Store creation request DTO
export class CreateStoreDto {
    constructor({ name, address, region }) {
        this.name = name;
        this.address = address;
        this.region = region;
    }

    validate() {
        if (!this.name || !this.address || !this.region) {
            throw new Error('Invalid store data');
        }
    }
}

// Store response DTO
export const storeResponseDTO = (store) => {
    return {
        id: store.id,
        name: store.name,
        address: store.address,
        region: store.region
    };
}

// store.dto.js

export const previewReviewResponseDTO = (data) => {

    const reviews = [];

    for (let i = 0; i < data.length; i++) {
        reviews.push({
            "user_name": data[i].user_name,
            "rate": data[i].rate,
            "review_body": data[i].review_content,
            "create_date": formatDate(data[i].created_at)
        })
    }
    return {"reviewData": reviews, "cursorId": data[data.length-1].review_id};
}

const formatDate = (date) => {
    return new Intl.DateTimeFormat('kr').format(new Date(date)).replaceAll(" ", "").slice(0, -1);
}
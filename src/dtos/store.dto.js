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

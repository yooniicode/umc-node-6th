// src/dtos/user.dto.js

// User creation request DTO
export class CreateUserDto {
    constructor({ email, password, name, birthYear, birthMonth, birthDay, gender, addr, specAddr, phone, prefer }) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
        this.gender = gender;
        this.addr = addr;
        this.specAddr = specAddr;
        this.phone = phone;
        this.prefer = prefer;
    }

    validate() {
        if (!this.email || !this.password || !this.name || !this.birthYear || !this.birthMonth || !this.birthDay || !this.gender || !this.addr || !this.specAddr || !this.phone || !this.prefer) {
            throw new Error('Invalid user data');
        }
    }
}

// User sign-in request DTO
export class SignInUserDto {
    constructor({ email, password }) {
        this.email = email;
        this.password = password;
    }

    validate() {
        if (!this.email || !this.password) {
            throw new Error('Invalid sign-in data');
        }
    }
}

// User sign-in response DTO
export const signinResponseDTO = (user, prefer) => {
    const preferFood = [];
    for (let i = 0; i < prefer[0].length; i++) {
        preferFood.push(prefer[0][i].f_category_name);
    }
    return { "email": user[0].email, "name": user[0].user_name, "preferCategory": preferFood };
};

import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { joinUser, signInUser } from "../services/user.service.js";
import { CreateUserDto, SignInUserDto } from '../dtos/user.dto.js';

export const userSignin = async (req, res, next) => {
    try {
        console.log("회원가입을 요청하였습니다!");
        console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

        const createUserDto = new CreateUserDto(req.body);
        createUserDto.validate();
        res.send(response(status.SUCCESS, await joinUser(createUserDto)));
    } catch (error) {
        console.error(error);
        res.status(500).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const signInUserDto = new SignInUserDto(req.body);
        signInUserDto.validate();
        const user = await signInUser(signInUserDto);
        res.status(200).json(response(status.SUCCESS, user));
    } catch (error) {
        console.error(error);
        res.status(500).json(response(status.INTERNAL_SERVER_ERROR, null));
    }
};

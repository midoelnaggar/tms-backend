import { NextFunction, Response } from "express"
import { LoginRequest, RegisterRequest } from "../../types";
import { loginSchema, registerSchema } from "../../validation/schemas";
import { validate } from "../../validation/validate";
import * as userRepository from "./users.repository";
import AppError from "../../helpers/appError";
import { comparePassword, hashPassword } from "../../helpers/passwordHelpers";
import { generateToken } from "../../helpers/tokenHelpers";

export const register = async (req: RegisterRequest, res: Response, next: NextFunction) => {
    const validatedData = await validate({
        data: req.body,
        schema: registerSchema,
        next
    });
    if (!!validatedData) {
        try {
            const { name, email, password } = validatedData;
            const userWithTheSameEmail = await userRepository.findUserByEmail(email.toLowerCase());
            if (!!userWithTheSameEmail) {
                next(new AppError("Email is already in use", 400))
            }
            const hashedPassword = await hashPassword(password);
            const createdUser = await userRepository.createUser({ name, email: email.toLowerCase(), password: hashedPassword });
            const token = generateToken(createdUser.id);
            res.status(201).json({
                ...createdUser,
                token
            });
        } catch (err) {
            next(new AppError("Error creating user", 400));
        }
    }
}

export const login = async (req: LoginRequest, res: Response, next: NextFunction) => {
    const validatedData = await validate({
        data: req.body,
        schema: loginSchema,
        next
    });
    if (!!validatedData) {
        try {
            const { email, password } = validatedData;
            const userWithTheSameEmail = await userRepository.findUserByEmail(email.toLowerCase());
            if (!userWithTheSameEmail) {
                next(new AppError("This email is not registered", 400))
            } else {
                if (await comparePassword(password, userWithTheSameEmail.password)) {
                    const { id, name, email } = userWithTheSameEmail;
                    const token = generateToken(id);
                    res.status(200).json({
                        id,
                        name,
                        email,
                        token
                    });
                } else {
                    next(new AppError("Wrong password", 400))
                }
            }

        } catch (error) {

        }
    }

}
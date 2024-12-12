import { NextFunction, Response } from "express";
import { CreateTaskRequest } from "../../types";
import { createTaskSchema } from "../../validation/schemas";
import * as taskRepository from "./tasks.repository";
import { findUserById } from "../users/users.repository";
import { validate } from "../../validation/validate";
import AppError from "../../helpers/appError";

export const createTask = async (req: CreateTaskRequest, res: Response, next: NextFunction) => {
    const validatedData = await validate({
        data: req.body,
        schema: createTaskSchema,
        next
    });
    if (!!validatedData) {
        const { title, description } = validatedData;
        const user = await findUserById(res.locals.userId)
        if (!user) {
            next(new AppError("Unable to find the user", 404));
        }
        try {
            const createdTask = await taskRepository.createTask({
                title,
                description,
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            });
            res.status(201).json(createdTask);
        } catch (err) {
            next(new AppError("error creating task", 400));
        }
    }
}

import { NextFunction, Response, Request } from "express";
import { CreateTaskRequest, DeleteTaskRequest, UpdateTaskStatusRequest } from "../../types";
import { createTaskSchema, updateTaskSchema } from "../../validation/schemas";
import * as taskRepository from "./tasks.repository";
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

        try {
            const createdTask = await taskRepository.createTask({
                title,
                description,
                user: {
                    connect: {
                        id: res.locals.userId
                    }
                }
            });
            res.status(201).json(createdTask);
        } catch (err) {
            next(new AppError("Error creating task", 400));
        }
    }
}

export const userTasks = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await taskRepository.userTasks(res.locals.userId);
        res.status(200).json(tasks);
    } catch (err) {
        next(new AppError("Error creating task", 400));
    }
}

export const updateTaskStatus = async (req: UpdateTaskStatusRequest, res: Response, next: NextFunction) => {
    const validatedData = await validate({
        data: req.body,
        schema: updateTaskSchema,
        next
    });
    if (!!validatedData) {
        try {
            const task = await taskRepository.updateTaskStatus(req.params.id, res.locals.userId, req.body.isCompleted);
            res.status(200).json({
                status: "success",
                message: `Task status changed to ${task.completed ? "completed" : "uncompleted"}`
            });
        } catch (err) {
            next(new AppError("Error updating task status", 400));
        }
    }
}

export const deletedTask = async (req: DeleteTaskRequest, res: Response, next: NextFunction) => {
    try {
        const task = await taskRepository.deleteTask(req.params.id, res.locals.userId);
        res.status(200).json({
            status: "success",
            message: `Task ${task.title} is deleted`
        });
    } catch (err) {
        next(new AppError("Error deleting task", 400));
    }
}
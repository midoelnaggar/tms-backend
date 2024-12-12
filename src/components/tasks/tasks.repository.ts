import { Prisma } from "@prisma/client"
import prisma from "../../db/client";

export const createTask = async (task: Prisma.TaskCreateInput) => {
    const createdTask = await prisma.task.create({
        data: task
    })
    return createdTask;
}

export const userTasks = async (userId: string) => {
    const createdTask = await prisma.task.findMany({
        where: {
            userId
        }
    })
    return createdTask;
}

export const updateTaskCompilation = async (id: string, isCompleted: boolean) => {
    const updatedTask = await prisma.task.update({
        where: {
            id
        },
        data: {
            completed: isCompleted
        }
    })
    return updatedTask;
}

export const deleteTask = async (id: string) => {
    const deletedTask = await prisma.task.delete({
        where: {
            id
        }
    })
    return deletedTask;
}

export const findTaskById = async (id: string) => {
    const task = await prisma.task.findUnique({
        where: {
            id
        }
    })
    return task;
}
import { Prisma } from "@prisma/client";
import prisma from "../../db/client";

export const createUser = async (user: Prisma.UserCreateInput) => {
    const createdUser = await prisma.user.create({
        data: user
    })
    return {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
    }
}

export const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user;
}

export const findUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user;
}
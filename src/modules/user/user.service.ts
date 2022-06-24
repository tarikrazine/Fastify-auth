import prisma from "../../utils/prisma";
import { UserRegisterInput } from "../user/user.schema";

export async function userRegister(body: UserRegisterInput) {
    return prisma.user.create({
        data: {
            ...body
        }
    })
}

export async function findUser(email: string) {
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}

export async function allUsers() {
    const users =  await prisma.user.findMany();

    return users
}
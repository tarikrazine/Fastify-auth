import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import argon2 from 'argon2';
import { StatusCodes } from "http-status-codes";

import { findUser, userRegister } from "../user/user.service";
import { UserLoginInput, UserLoginResponseInput, UserRegisterInput, UserResponseInput } from "../user/user.schema";

export async function userRegisterHandler(request: FastifyRequest<{ Body: UserRegisterInput , Reply: UserResponseInput}>, replay: FastifyReply) {

    const { password, ...rest } = request.body;

    const hash = await argon2.hash(password);

    try {
        const user = await userRegister({password: hash, ...rest});

        replay.status(StatusCodes.CREATED).send({user});
    } catch (e) {
        request.log.info(e)
        replay.code(500).send(e)
    }

}

export async function userLoginHandler(fastify:  FastifyInstance,request: FastifyRequest<{ Body: UserLoginInput , Reply: UserLoginResponseInput}>, replay: FastifyReply) {
    
        const { email, password } = request.body;

        const user = await findUser(email);

        if (!user) {
            replay.code(StatusCodes.NOT_FOUND).send({message: 'User not found'})
            return
        }

        const isValid = await argon2.verify(user.password, password);

        if (!isValid) {
            replay.code(StatusCodes.NOT_FOUND).send({message: 'Invalid password'})
            return
        }

        const accessToken = fastify.jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })

        replay.status(StatusCodes.OK).send({accessToken})

}
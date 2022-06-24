import { FastifyRequest, FastifyReply } from "fastify";

import { allUsers } from "./user.service";
import { UsersResponseInput } from "./user.schema";

export async function usersHandler(request: FastifyRequest<{ Reply: UsersResponseInput}>, replay: FastifyReply) {
    try {
        const users = await allUsers();

        replay.status(200).send({users});
    } catch (e) {
        request.log.info(e)
        replay.code(500).send(e)
    }

}
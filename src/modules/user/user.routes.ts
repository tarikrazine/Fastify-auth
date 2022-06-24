import { FastifyInstance } from "fastify";
import _ from 'lodash'

import { usersHandler } from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(fastify: FastifyInstance) { 

    fastify.get('/', {
        schema: {
            response: {
                200: $ref('usersResponseSchema')
            }
        },
        preHandler: [fastify.auth]
    }, usersHandler)
}

export default userRoutes

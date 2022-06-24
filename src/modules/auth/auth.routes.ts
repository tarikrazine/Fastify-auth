import { FastifyInstance } from "fastify";
import _ from 'lodash'

import { $ref } from "../user/user.schema";
import { userRegisterHandler, userLoginHandler } from "./auth.controller";

async function authRoutes(fastify: FastifyInstance) { 

    fastify.post('/register', {
        schema: {
            body: $ref('userRegisterSchema'),
            response: {
                201: $ref('userResponseSchema'),
            }
        }
    }, userRegisterHandler)

    fastify.post('/login', {
        schema: {
            body: $ref('userLoginSchema'),
            response: {
                200: $ref('userLoginResponseSchema'),
            }
        }
    }, _.partial(userLoginHandler, fastify))
}


export default authRoutes
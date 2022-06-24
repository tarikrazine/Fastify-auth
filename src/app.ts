import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import jwt from "@fastify/jwt"

import userRoutes from './modules/user/user.routes';
import authRoutes from './modules/auth/auth.routes';
import { userSchemas } from './modules/user/user.schema';

const server = Fastify({
    logger: true
})

server.register(jwt, {
    secret: 'supersecret'
})

server.decorate(
    "auth",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
);

server.addHook("preHandler", (request: FastifyRequest, reply: FastifyReply, next) => {
    request.jwt = server.jwt;
    return next();
});

for (const schema of userSchemas) {
    server.addSchema(schema)
}

server.get('/healthCheck', () => {
    return {
        status: 'OK'
    }
})

server.register(authRoutes, { prefix: '/api/v1/auth' })
server.register(userRoutes, { prefix: '/api/v1/users' })

async function boostrap() {
    try  {
        await server.listen({port: 8000, host: '0.0.0.0'})
    } catch (e) {
        server.log.info(e)
        process.exit(1)
    }
}

boostrap()
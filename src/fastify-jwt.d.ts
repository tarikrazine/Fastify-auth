import "@fastify/jwt"

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
        id: string
        username: string | null
        email: string
        createdAt: Date
        updatedAt: Date
    } // user type is return type of `request.user` object
  }
}

declare module "fastify" {
    interface FastifyRequest {
      jwt: JWT;
    }
    export interface FastifyInstance {
      auth: any;
    }
}
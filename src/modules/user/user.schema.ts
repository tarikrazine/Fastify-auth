import z from "zod"
import { buildJsonSchemas } from "fastify-zod"

const userCore = {
    username: z.string(),
    email: z.string({
        required_error: 'Email is required',
    }).email('Email is not valid'),
}

const userRegisterSchema = z.object({
    password: z.string({
        required_error: 'Password is required'
    }).min(5, { message: "Must be 5 or more characters long" }),
    ...userCore,
})

const userResponseSchema = z.object({
    user: z.object({
        id: z.string().optional(),
        ...userCore,
        createdAt: z.string().optional(),
        updatedAt: z.string().optional()
    })
})

const usersResponseSchema = z.object({
    users: z.array(z.object({
        id: z.string().optional(),
        ...userCore,
        createdAt: z.string().optional(),
        updatedAt: z.string().optional()
    }))
})

const userLoginSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
    }).email('Email is not valid'),
    password: z.string({
        required_error: 'Password is required'
    }).min(5, { message: "Must be 5 or more characters long" }),
})

const userLoginResponseSchema = z.object({
    accessToken: z.string()
})

export type UserRegisterInput = z.infer<typeof userRegisterSchema>
export type UserResponseInput = z.infer<typeof userResponseSchema>
export type UsersResponseInput = z.infer<typeof usersResponseSchema>
export type UserLoginInput = z.infer<typeof userLoginSchema>
export type UserLoginResponseInput = z.infer<typeof userLoginResponseSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    userRegisterSchema,
    userResponseSchema,
    usersResponseSchema,
    userLoginSchema,
    userLoginResponseSchema
})
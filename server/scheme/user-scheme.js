
const { z } = require('zod');

const userCreateSchema = z.object({
    username: z.string().min(3, "El nombre debe tener mas de 3 caracteres").max(20),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(20),
});

const userLoginSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(20),
});

module.exports = {
    userCreateSchema,
    userLoginSchema
};
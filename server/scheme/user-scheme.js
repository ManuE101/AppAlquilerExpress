
import { z } from 'zod';


export const userCreateSchema = z.object({
    username: z.string().min(3, "El nombre debe tener mas de 3 caracteres").max(20),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(20),
});

import { z } from 'zod';


export const userCreateSchema = z.object({
    username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").max(20),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(20),
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(30),
    apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres").max(30),
    correo: z.string().email("Debe ser un correo válido"),
    dni: z.string().min(6, "El DNI debe tener al menos 6 dígitos").max(15).regex(/^\d+$/, "El DNI debe contener solo números"),
    telefono: z.string().min(6, "El teléfono debe tener al menos 6 dígitos").max(20).regex(/^\d+$/, "El teléfono debe contener solo números"),
    rol: z.enum(["admin", "empleado", "cliente"], { message: "Rol inválido" }),
});


export const userEditSchema = userCreateSchema.partial();
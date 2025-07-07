
import { z } from "zod";

export const inmuebleEditSchema = z.object({
  titulo: z.string().min(1, "El título no puede estar vacío").optional(),
  desc: z.string().min(1, "La descripción no puede estar vacía").optional(),
  puntaje: z.preprocess((val) => parseFloat(val), z.number({
    invalid_type_error: "El puntaje debe ser un número",
  }).min(0, "Mínimo 0").max(5, "Máximo 5")).optional(),
  precio: z.preprocess((val) => parseFloat(val), z.number({
    invalid_type_error: "El precio debe ser un número",
  }).nonnegative("El precio no puede ser negativo")).optional(),
  habitaciones: z.preprocess((val) => parseInt(val), z.number({
    invalid_type_error: "La cantidad de habitaciones debe ser un número",
  }).int().min(1, "Debe tener al menos una habitación")).optional(),
  domicilio: z.string().min(1, "El domicilio no puede estar vacío").optional(),
  imagen: z.string().url("Debe ser una URL válida").optional(),
});

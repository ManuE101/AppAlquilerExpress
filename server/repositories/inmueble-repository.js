import DBLocal from "db-local"
import Inmueble from "../models/InmuebleModel.js";
import { inmuebleEditSchema } from "../scheme/inmueble-scheme.js";

export class InmuebleRepository{
    static async create({ titulo ,desc, puntaje, precio, habitaciones, domicilio, imagen}) {
        const idX = crypto.randomUUID();
        const inmueble = await this.getById(idX);
        if (inmueble) {
            throw new Error("Inmueble ya existe con ese ID");
        }

        Inmueble.create({
            _id: idX, // MongoDB uses _id as the primary key SE DEBE SACAR A FUTURO O ARREGLAR TODOS LOS LLAMADOS A ID Y CAMBIARLOS POR _ID
            id:idX,
            titulo,
            desc,
            puntaje,
            precio,
            habitaciones,
            domicilio,
            imagen,
            disponible: true,
        }).save()
    }

    static async delete(idParam) {
        const inmueble = await Inmueble.findOne({ id: idParam });
        if (!inmueble) {
            throw new Error("Inmueble no encontrado");
        }
        try{
            await Inmueble.remove({ id: idParam });
            return { message: "Inmueble eliminado con éxito" , ok : true};
        }
        catch (error) {
            throw new Error("Error al eliminar el inmueble: " + error.message);
        }   
    }


    //COPYPASTEADO DE CHATGPT PORQUE YA LO TENIA HECHO EN USERS Y LE DIJE HACEMELO CON INMUEBLES PORFA
   static async update(idParam, data) {
  // 1. Buscar el inmueble por su ID
  const inmueble = await Inmueble.findOne({ id: idParam });
  const {titulo,desc,puntaje,precio,habitaciones,domicilio,imagen} = data;


  if (!inmueble) {
    throw new Error("Inmueble no encontrado");
  }
  // 2. Validar los datos (si usás Zod o similar)
  const parsed = inmuebleEditSchema.safeParse({titulo,desc,puntaje,precio,habitaciones,domicilio,imagen});
  if (!parsed.success) {
    throw new Error(JSON.stringify(parsed.error.format()));
  }
  // 3. Actualizar solo los campos presentes en `data`
  inmueble.titulo = titulo ?? inmueble.titulo;
  inmueble.desc = desc ?? inmueble.desc;
  inmueble.puntaje = puntaje ?? inmueble.puntaje;
  inmueble.precio = precio ?? inmueble.precio;
  inmueble.habitaciones = habitaciones ?? inmueble.habitaciones;
  inmueble.domicilio = domicilio ?? inmueble.domicilio;
  inmueble.imagen = imagen ?? inmueble.imagen;


  console.log("Inmueble actualizado:", inmueble);
  // 4. Guardar cambios
  await inmueble.save();

  return { ok: true, message: "Inmueble actualizado con éxito", inmueble };
}


    static async getAll() {
        const inmuebles = await Inmueble.find()
        return inmuebles
    }

    static async getById(idParam) {
        console.log("Buscando inmueble con ID:", idParam);
        const inmueble = await Inmueble.findOne({ id: idParam })
        return inmueble
    }
}

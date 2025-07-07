import DBLocal from "db-local"
import Inmueble from "../models/InmuebleModel.js";

export class InmuebleRepository{
    static async create({ titulo ,desc, puntaje, precio, habitaciones, domicilio, imagen}) {
        const idX = crypto.randomUUID();
        Inmueble.create({
            id: idX,
            titulo,
            desc,
            puntaje,
            precio,
            habitaciones,
            domicilio,
            imagen
        }).save()
    }

    static async getAll() {
        const inmuebles = await Inmueble.find()
        return inmuebles
    }

    static async getById(idParam) {
        const inmueble = await Inmueble.findOne({ id: Number(idParam) })
        return inmueble
    }
}

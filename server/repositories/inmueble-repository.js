import DBLocal from "db-local"



const { Schema } = new DBLocal({ path: './db' })

const Inmueble = Schema('Inmueble' , {
    _id: {type: String, required:true},
    titulo: { type:String, required: true},
    desc: { type: String, required: true},
    puntaje: { type: Number, required: true},
    precio: { type: Number, required: true},
    habitaciones: { type: Number, required: true},
    politica: { type: Number, required: true},
    domicilio: { type: String, required: true},
    imagen: { type: String, required: true},
})

export class InmuebleRepository{
    static async create({ titulo ,desc, puntaje, precio, habitaciones, politica, domicilio, imagen}) {
        const idX = crypto.randomUUID();
        Inmueble.create({
            _id: idX,
            titulo,
            desc,
            puntaje,
            precio,
            habitaciones,
            politica,
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

import DBLocal from "db-local"



const { Schema } = new DBLocal({ path: './db' })

const Inmueble = Schema('Inmueble' , {
    _id: {type: String, required:true},
    titulo: { type:String, required: true},
    desc: { type: String, required: true},
    puntaje: { type: Number, required: true},
    precio: { type: Number, required: true},
    habitaciones: { type: Number, required: true},
    domicilio: { type: String, required: true},
    imagen: { type: String, required: true},
})

export class InmuebleRepository{
    static async create({ titulo ,desc, puntaje, precio, habitaciones, domicilio, imagen}) {
        const idX = crypto.randomUUID();
        Inmueble.create({
            _id: idX,
            titulo,
            desc,
            puntaje,
            precio,
            habitaciones,
            domicilio,
            imagen
        }).save()
    }
   
    static async getAll() { // con esto listas todos los inmuebles
        return await Inmueble.find()
    }
}

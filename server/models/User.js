import DBLocal from "db-local"

const { Schema  } = new DBLocal({ path: './db'})


const User = Schema('User', {
    _id: {type: String, required:true},
    username: { type:String, required: true},
    password: { type: String, required: true},
    rol: {type: String, required:true},
    nombre: { type: String },
    apellido: { type: String },
    correo: { type: String },
    dni: { type: String },      // Usar string para evitar problemas con ceros a la izquierda
    telefono: { type: String },
    nacimiento: {type: String},
    codigo: {type: String}
});

export default User;
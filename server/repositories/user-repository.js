import DBLocal from "db-local"
import crypto, { hash } from "node:crypto"
import bcrypt from 'bcrypt'
import { userCreateSchema , userEditSchema } from "../scheme/user-scheme.js"


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
    nacimiento: {type: String}
});

export class UserRepository{
  static async create(data) {
    // 1- Validaciones
    const parsed = userCreateSchema.safeParse(data);
    if (!parsed.success) {
        console.log('Error de validación:', parsed.error.format());
        throw new Error(JSON.stringify(parsed.error.format()));
    }

    // 2- Asegurarse que el username y DNI no existen
    const user = await User.findOne({ username: data.username });
    if (user) throw new Error('Username ya existente');
    const userDni = await User.findOne({ dni: data.dni });
    if (userDni) throw new Error('DNI ya existente');

    // 3- Codifico la contraseña
    const idX = crypto.randomUUID();
    const hashPassword = await bcrypt.hash(data.password, 10);
    
    // 4- Creo el usuario (descompón el objeto y sobreescribe password)
    User.create({
        _id: idX,
        ...data,
        password: hashPassword // Sobrescribe el password plano por el hasheado
    }).save();
}

    static async getUser(id) {
        const user = await User.findOne({_id: id})
        if(!user) throw new Error('No existe tal usuario')
        const {password: _, ...publicUser} = user //saco la contraseña
        return publicUser
    }

    static async login({username , password}) {
        const user =await  User.findOne({username})
        if(!user) throw new Error('No existe tal usuario')
           
        console.log('Usuario encontrado:', user);

        const isValid = await bcrypt.compare(password, user.password) //la encripta y compara con la encriptada
        if(!isValid) throw new Error('Contraseña invalida')

        const {password: _ , ...publicUser} = user   
        return publicUser
    }

    static async delete(id){
        await User.remove({_id: id})
        return {ok:true, message: 'Usuario eliminado correctamente'}    
    }

    static async deletePorDNI(dni) {
        const user = await User.findOne(dni)
        if (!user) {
            throw new Error('No existe un usuario con ese DNI');
        }   
        await User.remove({_id: user._id});
        return { ok: true, message: 'Usuario eliminado correctamente' };
    }

    static async getEmpleados() {
        const empleados = await User.find({rol: "empleado"});
        if (!empleados || empleados.length === 0) {
            throw new Error('No hay empleados registrados');
        }
        return empleados;
    }

    static async editUser({ id, username, nombre, apellido, correo, dni, telefono }) {
        const usuario = await User.findOne({ _id: id });
        if (!usuario) throw new Error("Usuario no encontrado");

        // Validar que el nuevo DNI no esté en uso por otro usuario (que no sea el mismo)
        if (dni && dni !== usuario.dni) {
            const dniExistente = await User.findOne({ dni });
            if (dniExistente) throw new Error("El DNI ingresado ya pertenece a otro usuario");
        }
        const parsed = userEditSchema.safeParse({username, nombre, apellido, correo, dni, telefono});
         if (!parsed.success) {
            throw new Error(JSON.stringify(parsed.error.format()));
        }
        // Actualizar campos
        usuario.username = username ?? usuario.username;
        usuario.nombre = nombre ?? usuario.nombre;
        usuario.apellido = apellido ?? usuario.apellido;
        usuario.correo = correo ?? usuario.correo;
        usuario.dni = dni ?? usuario.dni;
        usuario.telefono = telefono ?? usuario.telefono;

        await usuario.save();
        return { ok: true, message: "Los datos del usuario han sido actualizados correctamente." };
    }
}
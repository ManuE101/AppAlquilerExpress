import DBLocal from "db-local"
import crypto, { hash } from "node:crypto"
import bcrypt from 'bcrypt'
import { userCreateSchema} from "../scheme/user-scheme.js"


const { Schema  } = new DBLocal({ path: './db'})

const User = Schema('User' , {
    _id: {type: String, required:true},
    username: { type:String, required: true},
    password: { type: String, required: true}
})

export class UserRepository{
    static async create({ username ,password}) {
        //1- validaciones
        //utilizar zod
        const parsed = userCreateSchema.safeParse({username, password})
        if (!parsed.success) {
            throw new Error(JSON.stringify(parsed.error.format()))
        }

        // 2- ASEGURARSE QUE EL USERNAME NO EXISTE
        const user = await User.findOne({username})
        if(user) throw  new Error('Username ya existente')

        const idX = crypto.randomUUID();
        const hashPassword = await bcrypt.hash(password,10)

        User.create({
            _id: idX,
            username,
            password: hashPassword
        }).save()
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
}
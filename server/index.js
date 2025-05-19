import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser"
import express from "express"
import z from "zod"
import cors from "cors";



import { UserRepository }  from "./user-repository.js";

const app = express();
const PORT = process.env.PORT ?? 8080;


//middle ware, funciones por las que se filtran las peticiones antes de llegar a la peticion real
app.use(express.json()) // middleware express.json, te transforma el body de la req en json
app.use(cookieParser()) // otro middleware que nos permite modificar las cookies
app.use(cors({
  origin: "http://localhost:3000", // o '*', pero es menos seguro
  credentials: true // para que las cookies funcionen si las usás
}));
app.use((req,res,next ) => {
     const token = req.cookies.access_token
     req.session = {user:null} // añado info a la peticion agregandole EL ATRIBUTO NULL SEA LA PETICION QEU SEA

     try {
        const data = jwt.verify(token , "boca") // boca tiene que ser .env
        req.session.user = data
    } catch{}
    

    next() // esto sigue a la siguiente ruta o middleware, es como un "ya termine"
})



app.get("/", (req,res) =>  {
    res.json({message: "hello world"})
});

app.post("/login", async (req,res) => {
    const {username , password} = req.body;

    try {
        const user = await UserRepository.login({username,password})
        const token = jwt.sign(
        {username: user.username} ,
        "boca" ,  // BOCA NO DEBERIA VERSE EN PRODUCCION
        {
            expiresIn: '8h'
        })
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
              sameSite: 'lax'      
        })
        .send({user,token})
    } catch (error){
        res.status(401).send(error.message)
    }
})


app.post("/register", async (req,res) => {
    const {username, password} = req.body
    console.log(req.body)

    try {
        const id = await UserRepository.create({username, password})
        res.send("usuario creado")

    } catch(error) {
        res.status(400).send(error.message)
    }
})
app.post("/logout", (req,res) => {
    res.clearCookie('access_token', {
  httpOnly: true,
  sameSite: 'lax' // o 'none' si usás HTTPS
})
  res.status(200).send('Logged out');

})


app.post("/protected", (req,res) => {
   if (!req.session.user) {
    return res.status(401).json({ message: "No autorizado" });
  }
  // Podés enviar lo que quieras sobre el usuario
  res.json({ message: "Acceso autorizado", user: req.session.user });
})

app.get("/protected", (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  // Aquí podrías validar el token si quieres
  res.json({ loggedIn: true });
});

app.use((req,res) => {
    res.status(404).send('<h1> Boca </h1>')
})

app.listen(PORT , () => {
    console.log(`Server started on  ${PORT}`);
})
import jwt from 'jsonwebtoken'

import express from "express"


const router = express.Router();
import { UserRepository }  from "../repositories/user-repository.js";

const app = express();



router.get("/", (req,res) =>  {
    res.json({message: "hello world"})
});

router.post("/login", async (req,res) => {
    const {username , password} = req.body;
    console.log(req.body)
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


router.post("/register", async (req,res) => {
    const {username, password} = req.body
    console.log(req.body)

    try {
        const id = await UserRepository.create({username, password})
        res.send("usuario creado")

    } catch(error) {
        res.status(400).send(error.message)
    }
})
router.post("/logout", (req,res) => {
    res.clearCookie('access_token', {
  httpOnly: true,
  sameSite: 'lax' // o 'none' si usás HTTPS
})
  res.status(200).send('Logged out');

})


router.post("/protected", (req,res) => {
   if (!req.session.user) {
    return res.status(401).json({ message: "No autorizado" });
  }
  // Podés enviar lo que quieras sobre el usuario
  res.json({ message: "Acceso autorizado", user: req.session.user });
})

router.get("/protected", (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  // Aquí podrías validar el token si quieres
  res.json({ loggedIn: true });
});





export default router;
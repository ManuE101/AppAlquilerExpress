import jwt from 'jsonwebtoken'

import express from "express"
import User from '../models/UserModel.js';

const router = express.Router();
import { UserRepository }  from "../repositories/user-repository.js";




router.get("/", (req,res) =>  {
    res.json({message: "hello world"})
});

router.post("/login", async (req,res) => {
    const {username , password} = req.body;
    console.log(req.body)
    try {
        const user = await UserRepository.login({username,password})
        if(user.requires2FA){
          return res.json({requires2FA: true, username: user.username});
        }
        const token = jwt.sign(
        {username: user.username,
          id: user._id,
          rol: user.rol
        } ,
        "boca" ,  // BOCA NO DEBERIA VERSE EN PRODUCCION
        {
            expiresIn: '8h'
        })
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
            sameSite: 'lax',
            path: '/',
        })
        .send({user,token})
    } catch (error){
        res.status(401).send(error.message)
    }
})


router.post("/register", async (req,res) => {
    try {
        const id = await UserRepository.create(req.body)
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

router.get("/get_user", async (req, res) => {
  console.log("Cookies recibidas:", req.cookies);
  const token = req.cookies.access_token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    const decoded = jwt.verify(token, "boca"); // Usá tu secret real en producción
    const user = await UserRepository.getUser(decoded.id);
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
});

router.delete("/eliminar_usuario/:id", async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    const decoded = jwt.verify(token, "boca");
    if (decoded.rol !== "admin") {
      return res.status(403).json({ message: "No tienes permisos para eliminar usuarios" });
    }

    res.json(await UserRepository.delete(req.params.id));
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});



router.post("/agregar_empleado", async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    const decoded = jwt.verify(token, "boca");
    if (decoded.rol !== "admin") {
      return res.status(403).json({ message: "No tienes permisos para agregar empleados" });
    }
    // sobreescribir el rol por seguridad ( ya checkee admin pero bueno)
    const result = await UserRepository.create({
      ...req.body,
      rol: "empleado" 
    });
    res.json("Empleado agregado correctamente");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/get_empleados", async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    const decoded = jwt.verify(token, "boca");
    if (decoded.rol !== "admin") {
      return res.status(403).json({ message: "No tienes permisos para ver empleados" });
    }
    const empleados = await UserRepository.getEmpleados();
    res.json(empleados);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/editar_usuario/:id", async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    const decoded = jwt.verify(token, "boca");
    if (decoded.rol !== "admin") { //siempre lo tengo que verificar? supongo que si
      return res.status(403).json({ message: "No tienes permisos para editar usuarios" });
    }
    const { username, nombre, apellido, correo, dni, telefono } = req.body;
    const result = await UserRepository.editUser({
      id: req.params.id,
      username,
      nombre,
      apellido,
      correo,
      dni,
      telefono
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get("/get_byID", async (req, res) => { 
  const user = await UserRepository.getUserByDNI(req.query.id);
  if (!user) {
    return res.status(404).json({ ok:false , message: "Usuario no encontrado" });
  }
  res.json({ok:true ,user});
});



router.post("/verify2FA", async (req, res) => {
  const { username, code } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !user.codigo) {
      return res.status(400).json({ message: "Código no solicitado" });
    }

    if (user.codigo !== code) {
      return res.status(401).json({ message: "Código incorrecto" });
    }

    user.codigo = null;
    await user.save();

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
        rol: user.rol
      },
      "boca",
      { expiresIn: '8h' }
    );

    const { password: _, ...publicUser } = user;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: "lax",
        path: "/",
      })
      .json({ user: publicUser, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put("/cambiar_rol/:id", async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    const decoded = jwt.verify(token, "boca");
    if (decoded.rol !== "admin") {
      return res.status(403).json({ message: "No tienes permisos para cambiar roles" });
    }
    const result = await UserRepository.cambiarRol(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


export default router;
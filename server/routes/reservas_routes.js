import express from "express";
import jwt from "jsonwebtoken";
import { ReservaRepository } from "../repositories/reservas_repository.js";

import { UserRepository } from "../repositories/user-repository.js";
import { sendReservaEmail } from "../controllers/mailController.js";

//import { use } from "react";

const router = express.Router();

router.get('/check', async (req, res) => {
  try {
    const { id_inmueble, fecha_inicio, fecha_fin } = req.query;
    if (!id_inmueble || !fecha_inicio || !fecha_fin) {
      return res.status(400).json({ ok: false, error: "Parámetros requeridos: id_inmueble, fecha_inicio, fecha_fin" });
    }
    // Usamos el método del repo para chequear disponibilidad
    const disponibilidad = await ReservaRepository.puedeReservar({ id_inmueble, fecha_inicio, fecha_fin });
    console.log("Disponibilidad:", disponibilidad);
    if (!disponibilidad.ok) {
      return res.json(disponibilidad);
    }

    return res.json({ ok: true, message: "Disponible para reservar" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Error interno del servidor" });
  }
});

router.post("/make_reserva_presencial", async (req, res) => {
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, "boca"); // decodeo el token
 
    

    if (!token) {
        return res.status(401).json({error: 'El usuario no esta logeado'})
    }

    const { id_inmueble, fecha_inicio, fecha_fin , dni } = req.body;
      const pedido = await fetch(`http://localhost:8080/inmueble/get_byID/${id_inmueble}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
      const inmueble = await pedido.json();
        const precio = inmueble.precio; // precio del inmueble
    try{
      console.log("DNI del cliente" , dni);
      const aux = await ReservaRepository.createPresencial({id_inmueble, dni  , fecha_inicio, fecha_fin , precio}); // devuelve true o false si se crea o no
      if (!aux.ok) {
        console.log(aux.error);
        return res.status(400).json({error: aux.error});
        }
        console.log(aux)
        res.send({id_reserva: aux.id_Reserva});
    } catch (error){
        console.error("Error al crear la reserva:", error);
        res.status(400).send(error.message);
    }
});


router.post("/make_reserva", async (req, res) => {
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, "boca"); // decodeo el token
 
    

    if (!token) {
        return res.status(401).json({error: 'El usuario no esta logeado'})
    }

    const { id_inmueble, fecha_inicio, fecha_fin } = req.body;
    console.log("Inmueble ID:", id_inmueble);
    const user_id = decoded.id; // id del usuario logeado

    try{
      const aux = await ReservaRepository.create({id_inmueble, user_id  , fecha_inicio, fecha_fin }); // devuelve true o false si se crea o no
      if (!aux.ok) {
        console.log(aux.error);
        return res.status(400).json({error: aux.error});
        }
        console.log(aux)
        res.send({id_reserva: aux.id_Reserva});
    } catch (error){
        console.error("Error al crear la reserva:", error);
        res.status(400).send(error.message);
    }
    const user = UserRepository.getUser(user_id);
    try{
        const aux1 = await sendReservaEmail(user.email, {
        nombre_usuario: user.nombre,
        id_reserva: aux.id_Reserva,
        id_inmueble,
        fecha_inicio,
        fecha_fin
        });
        if(!aux1.ok){
            console.log(aux.error);
            return res.status(400).json({error: aux.error});
        }
        res.send({id_reserva: aux.id_Reserva});
    } catch (error){
        console.error("Error al crear la reserva:", error);
        res.status(400).send(error.message);
    }
});

router.post("/reservas_usuario", async (req, res) => {
    const user_id = req.body;
    console.log("id recibidos:", user_id);
    try {
        const reservas = await ReservaRepository.getAll();
        const result = reservas.filter(reserva => {
            console.log("id reserva:", reserva.user_id);
            console.log("id cliente:", user_id);
            console.log("estado:", reserva.estado);
        return (
            (reserva.user_id === user_id.id_Cliente) &&
            (reserva.estado === 'activa') 
            )
        });
        console.log(result)
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/cancelar_reserva", async (req, res) => {
    const { id_reserva } = req.body;
    console.log("id recibido:", id_reserva);
    try{
        const aux = await ReservaRepository.cancel({id_reserva}); // tenias que mandarlo como {}
        if (!aux.ok) {
        console.log(aux.error);
        return res.status(400).json({error: aux.error});
        }
        res.send({id_reserva: aux.id_Reserva});
    } catch (error){
        console.error("Error al cancelar la reserva:", error);
        res.status(400).send(error.message);
    }
})

router.post("/reservas_usuario_canceladas", async (req, res) => {
    const user_id = req.body;
    try {
        const reservas = await ReservaRepository.getAll();
        const result = reservas.filter(reserva => {
            console.log("id reserva:", reserva.user_id);
            console.log("id cliente:", user_id);
            console.log("estado:", reserva.estado);
        return (
            (reserva.user_id === user_id.id_Cliente &&
            reserva.estado === 'cancelada')
        )
        });
        console.log(result)
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post("/make_presencial", async (req, res) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Usuario no autenticado" });

  const decoded = jwt.verify(token, "boca");

  if (!["empleado", "admin"].includes(decoded.rol)) {
    return res.status(403).json({ error: "No tienes permisos para hacer reservas presenciales" });
  }

  const { id_inmueble, fecha_inicio, fecha_fin, dni_cliente } = req.body;
  let precio = 1;
  try {
    const resultado = await ReservaRepository.createPresencial({
      id_inmueble,
      fecha_inicio,
      fecha_fin,
      dni_cliente,
      precio,
    });

    if (!resultado.ok) {
      return res.status(400).json({ error: resultado.error });
    }

    res.json(resultado);
  } catch (error) {
    console.error("Error en reserva presencial:", error);
    res.status(500).json({ error: "Error interno al crear reserva presencial" });
  }
});

export default router;
import express from "express";
import jwt from "jsonwebtoken";
import { ReservaRepository } from "../repositories/reservas_repository.js";
import { UserRepository } from "../repositories/user-repository.js";
import { sendReservaEmail } from "../controllers/mailController.js";
//import { use } from "react";

const router = express.Router();

router.get('/reserva/check', async (req, res) => {
  try {
    const { id_inmueble, fecha_inicio, fecha_fin } = req.query;
    if (!id_inmueble || !fecha_inicio || !fecha_fin) {
      return res.status(400).json({ ok: false, error: "Parámetros requeridos: id_inmueble, fecha_inicio, fecha_fin" });
    }

    // Usamos el método del repo para chequear disponibilidad
    const disponibilidad = await ReservaRepository.puedeReservar({ id_inmueble, fecha_inicio, fecha_fin });

    if (!disponibilidad.ok) {
      return res.json(disponibilidad);
    }

    return res.json({ ok: true, message: "Disponible para reservar" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Error interno del servidor" });
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

router.post("/entre-fechas", async (req, res) => {
    const {fechaInicio, fechaFin} = req.body;
    if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ error: "Faltan fechas" });
    }
    try{
        const reservas = await ReservaRepository.getReservasEntre(fechaInicio, fechaFin);
        res.json(reservas);
    } catch (error){
        console.error("Error al obtener reservas entre fechas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

router.post("/clientes-entre-fechas", async (req, res) => {
  const { fechaInicio, fechaFin } = req.body;
  try {
    const idsClientes = await ReservaRepository.getClientesQueReservaronEntre(fechaInicio, fechaFin);
    console.log(idsClientes);
    const clientes = await Promise.all(
      idsClientes.map(async (id) => {
        const user = await UserRepository.getUser(id);
        return {
          id: user._id,
          nombre: user.nombre,
          dni: user.dni,
          apellido: user.apellido,
          email: user.correo
        };
      })
    );

    res.json(clientes);
  } catch (error) {
    console.error("Error al obtener clientes entre fechas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
})

router.post("/monto-entre-fechas", async (req, res) => {
  const { fechaInicio, fechaFin } = req.body;
  try{
    const total = await ReservaRepository.getPrecioInmueblesEntre(fechaInicio, fechaFin);
    res.json({ total });
  } catch (error) {
    console.error("Error al calcular dinero:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
})

export default router;
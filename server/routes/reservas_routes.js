import express from "express";
import jwt from "jsonwebtoken";
import { ReservaRepository } from "../repositories/reservas_repository.js";

const router = express.Router();


router.post("/make_reserva", async (req, res) => {
    const token = req.cookies.access_token;
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
});

export default router;
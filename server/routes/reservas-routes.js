import express from "express";
import { ReservaRepository } from "../repositories/reserva_repo.js";

const router = express.Router();

router.post("/make_reserve", async (req, res) => {
    const userId = req.cookies.user_id;

    if (!userId) {
        return res.status(401).json({error: 'El usuario no esta logeado'})
    }

    const { inmueble_id, fecha_inicio, fecha_fin } = req.body;

    try{
        const id = await ReservaRepository.create({ inmueble_id, userId, fecha_inicio, fecha_fin });
        res.send("Reserva hecha exitosamente");
    } catch (error){
        res.status(400).send(error.message);
    }
});

export default router;
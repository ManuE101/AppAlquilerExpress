import express from "express";
import { InmuebleRepository } from "../repositories/inmueble-repository.js";

const router = express.Router();


router.post("/create_inmueble", async (req, res) => {
    const { titulo, desc, puntaje, precio, habitaciones, domicilio, imagen } = req.body;

    try {
        const id = await InmuebleRepository.create({ titulo, desc, puntaje, precio, habitaciones, domicilio, imagen });
        res.send("Inmueble creado");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/get_Inmuebles", async (req, res) => {
    try {
        const inmuebles = await InmuebleRepository.getAll();
        res.send(inmuebles);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
);

router.post("/inmuebles_filter", async (req, res) => {
    const filters = req.body; // Recibe el JSON con los filtros
    console.log("Filtros recibidos:", filters);
    try {
        const inmuebles = await InmuebleRepository.getAll(); // Trae todos
        // Filtra en memoria según los operadores recibidos
        const result = inmuebles.filter(inmueble => {
            console.log("Inmueble:", inmueble.precio , typeof inmueble.precio);
            console.log("Filtro:", filters.precio , typeof filters.precio);
        return (
            (inmueble.puntaje >= filters.puntaje || 0) &&
            (inmueble.precio >= filters.precio || 0) &&
           (inmueble.habitaciones >= filters.habitaciones || 0)
            )
        });
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;
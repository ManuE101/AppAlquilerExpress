import express from "express";
import { InmuebleRepository } from "../repositories/inmueble-repository.js";

const router = express.Router();


router.post("/create_inmueble", async (req, res) => {
    const { titulo, desc, puntaje, precio, habitaciones, politica, domicilio, imagen } = req.body;

    try {
        const id = await InmuebleRepository.create({ titulo, desc, puntaje, precio, habitaciones, politica, domicilio, imagen });
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
          return (
            (filters.tipo === undefined || inmueble.tipo === filters.tipo) &&
            (filters.puntaje === undefined || inmueble.puntaje >= filters.puntaje) &&
            (filters.precio === undefined || inmueble.precio >= filters.precio) &&
            (
                // Solo filtra habitaciones si el tipo es Vivienda
                filters.habitaciones === undefined ||
                inmueble.tipo !== "Vivienda" ||
                inmueble.habitaciones >= filters.habitaciones
            )
          );
        });
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/reservas_usuario", async (req, res) => {
    const {id_Cliente} = req.body;
    console.log("id recibidos:", id_Cliente);
    try {
        const inmuebles = await InmuebleRepository.getAll();
        const result = inmuebles.filter(inmueble => {
            console.log("id inmueble:", inmueble.id_Cliente);
            console.log("id cliente:", id_Cliente);
        return (
            (inmueble.id_Cliente === id_Cliente) 
            )
        });
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/get_byID/:id", async (req, res) => {
    const { id } = req.params;
    console.log("ID recibido:", id);
    try {
        const inmueble = await InmuebleRepository.getById(id);
        if (!inmueble) {
            return res.status(404).json({ error: "Inmueble no encontrado" });
        }
        console.log("Inmueble encontrado:", inmueble);
        res.json(inmueble);
    } catch (error) {
        res.status(500).json({ error: error.message }); // <-- SIEMPRE JSON
    }
});

export default router;
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

    try {
        const inmuebles = await InmuebleRepository.getAll(); // Trae todos
        // Filtra en memoria según los operadores recibidos
        const result = inmuebles.filter(inmueble => {
            for (const key in filters) {
                const value = filters[key];
                if (typeof value === "object" && value !== null) {
                    // Soporta operadores
                    if ("$gt" in value && !(inmueble[key] > value["$gt"])) return false;
                    if ("$gte" in value && !(inmueble[key] >= value["$gte"])) return false;
                    if ("$lt" in value && !(inmueble[key] < value["$lt"])) return false;
                    if ("$lte" in value && !(inmueble[key] <= value["$lte"])) return false;
                    if ("$eq" in value && !(inmueble[key] === value["$eq"])) return false;
                } else {
                    // Igualdad simple
                    if (inmueble[key] !== value) return false;
                }
            }
            return true;
        });
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;
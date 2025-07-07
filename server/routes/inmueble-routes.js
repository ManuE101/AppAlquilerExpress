import express from "express";
import { InmuebleRepository } from "../repositories/inmueble-repository.js";
import jwt from "jsonwebtoken";

const router = express.Router();


router.post("/create_inmueble", async (req, res) => {
    const { titulo, desc, puntaje, precio, habitaciones, domicilio, imagen } = req.body;

    try {
        const id = await InmuebleRepository.create({ titulo, desc, puntaje, precio, habitaciones, domicilio, imagen });
        res.send({id});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/update_inmueble/:id", async (req, res) => {
    const { id } = req.params;
    console.log("ID recibido para actualizar:", id);
    const { titulo, desc, puntaje, precio, habitaciones, domicilio, imagen } = req.body;
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: "No autorizado" });
    }
    try {
        const decoded = jwt.verify(token, "boca");
        if (decoded.rol !== "admin") {
            return res.status(403).json({ message: "No tienes permisos para editar inmuebles" });
        }
        const result = await InmuebleRepository.update(id, { titulo, desc, puntaje, precio, habitaciones, domicilio, imagen });
        if (result.ok) {   
            return res.json(result);
        } else {
            return res.status(400).json({ message: "Error al actualizar el inmueble" });
        }
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
});

router.delete("/delete_inmueble/:id", async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }
  try {
    const decoded = jwt.verify(token, "boca");
    if (decoded.rol !== "admin") {
      return res.status(403).json({ message: "No tienes permisos para eliminar inmuebles" });
    }
    const result = await InmuebleRepository.delete(id);
    if(result.ok) {
        return res.json(result);
    }
  }
  catch (err) {
    return res.status(401).json({ message: err.message });
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
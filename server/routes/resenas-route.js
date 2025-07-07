// routes/reseñas-route.js
import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const filePath = path.resolve("data/resenas.json");

// leer json de reseñas
function readResenas() {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

// guardar reseñas en el json
function saveResenas(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET: todas las reseñas de un inmueble
router.get("/:inmuebleId", (req, res) => {
  const data = readResenas();
  const { inmuebleId } = req.params;
  res.json(data[inmuebleId] ?? []);
});

// POST: agregar una nueva reseña
router.post("/:inmuebleId", (req, res) => {
  console.log("USER EN RUTA RESEÑA", req.session.user);
  const user = req.session?.user;
  if (!user) return res.status(401).send("No autenticado");

  const { texto, estrellas } = req.body;
  const { inmuebleId } = req.params;

  if (
    !texto ||
    typeof estrellas !== "number" ||
    estrellas < 1 ||
    estrellas > 5
  ) {
    return res.status(400).send("Datos inválidos");
  }

  const data = readResenas();
  if (!data[inmuebleId]) data[inmuebleId] = [];

  const nuevaResena = {
    id: Date.now(),
    user: user.username,
    texto,
    estrellas,
    fecha: new Date().toISOString(),
  };

  data[inmuebleId].push(nuevaResena);
  saveResenas(data);
  res.status(201).json(nuevaResena);
});

//eliminar reseña
router.delete("/:id", (req, res) => {
  const user = req.session?.user; // <--- acá el cambio
  const idNum = parseInt(req.params.id);

  if (!user) return res.status(401).send("No autenticado");

  const data = readResenas();
  let eliminado = false;

  for (const inmuebleId in data) {
    const resenas = Array.isArray(data[inmuebleId]) ? data[inmuebleId] : [];

    const nuevas = resenas.filter((r) => {
      const puedeEliminar =
        r.id === idNum &&
        (r.user === user.username ||
          user.rol === "admin" ||
          user.rol === "empleado");

      if (puedeEliminar) {
        eliminado = true;
        return false;
      }

      return true;
    });

    data[inmuebleId] = nuevas;
  }

  if (!eliminado) return res.status(403).send("No autorizado o no encontrado");

  saveResenas(data);
  res.sendStatus(204);
});

export default router;

import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const filePath = path.resolve("data/comentarios.json");

// leer json de comentarios
function readComments() {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

// guardar comentarios en el json
function saveComments(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// comentarios por inmuebles
router.get("/:inmuebleId", (req, res) => {
  const data = readComments();
  const { inmuebleId } = req.params;
  res.json(data[inmuebleId] ?? []);
});

// comentario principal
router.post("/:inmuebleId", (req, res) => {
  const user = req.session?.user;
  if (!user) return res.status(401).send("No autenticado");

  const { text } = req.body;
  const { inmuebleId } = req.params;

  const data = readComments();
  if (!data[inmuebleId]) data[inmuebleId] = [];

  const nuevoComentario = {
    id: Date.now(),
    user: user.username,
    text,
    respuestas: [],
    fecha: new Date().toISOString()
  };

  data[inmuebleId].push(nuevoComentario);
  saveComments(data);
  res.status(201).json(nuevoComentario);
});

// respuesta a comentario
router.post("/:inmuebleId/:comentarioId/responder", (req, res) => {
  const user = req.session?.user;
  if (!user) return res.status(401).send("No autenticado");

  // verificar rol
  if (user.rol !== "admin" && user.rol !== "empleado") {
    return res.status(403).send("No puedes responder comentarios");
  }

  const { text } = req.body;
  const { inmuebleId, comentarioId } = req.params;

  const data = readComments();
  const comentario = data[inmuebleId]?.find(c => c.id == comentarioId);
  if (!comentario) return res.status(404).send("Comentario no encontrado");

  const nuevaRespuesta = {
    id: Date.now(),
    user: user.username,
    text,
    fecha: new Date().toISOString()
  };

  if (!Array.isArray(comentario.respuestas)) comentario.respuestas = [];
  comentario.respuestas.push(nuevaRespuesta);
  saveComments(data);
  res.status(201).json(nuevaRespuesta);
});

// Eliminar comentario o respuesta solo si sos el autor o admin o empleado
router.delete("/:id", (req, res) => {
  const user = req.session?.user;
  const idNum = parseInt(req.params.id);

  if (!user) return res.status(401).send("No autenticado");

  const data = readComments();
  let eliminado = false;

  for (const inmuebleId in data) {
    const comentarios = Array.isArray(data[inmuebleId]) ? data[inmuebleId] : [];

    const nuevosComentarios = comentarios.filter(c => {
      const puedeEliminarComentario =
        c.id === idNum &&
        (c.user === user.username || user.rol === "admin" || user.rol === "empleado");

      if (puedeEliminarComentario) {
        eliminado = true;
        return false; // eliminar el comentario principal
      }

      if (!Array.isArray(c.respuestas)) c.respuestas = [];

      const antes = c.respuestas.length;
      c.respuestas = c.respuestas.filter(r => {
        const puedeEliminarRespuesta =
          r.id === idNum &&
          (r.user === user.username || user.rol === "admin" || user.rol === "empleado");

        if (puedeEliminarRespuesta) eliminado = true;
        return !puedeEliminarRespuesta;
      });

      return true; // mantener el comentario principal
    });

    data[inmuebleId] = nuevosComentarios;
  }

  if (!eliminado) return res.status(403).send("No autorizado o no encontrado");

  saveComments(data);
  res.sendStatus(204);
});

export default router;

import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const FILE_PATH = path.resolve("data", "comentarios.json");


if (!fs.existsSync(FILE_PATH)) {
  fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });
  fs.writeFileSync(FILE_PATH, "[]");
}

function readComments() {
  return JSON.parse(fs.readFileSync(FILE_PATH));
}

function saveComments(comments) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(comments, null, 2));
}

// obtener todos los comentarios
router.get("/", (req, res) => {
  const comentarios = readComments();
  res.json(comentarios);
});

// agregar comentario (usuario logueado)
router.post("/", (req, res) => {
  const user = req.session?.user;
  const { text } = req.body;

  if (!user) return res.status(401).send("No autenticado");
  if (!text?.trim()) return res.status(400).send("Texto requerido");

  const comentarios = readComments();
  const nuevo = {
    id: Date.now(),
    user: user.username,
    text,
  };

  comentarios.push(nuevo);
  saveComments(comentarios);
  res.status(201).json(nuevo);
});

// borrar comentario propio
router.delete("/:id", (req, res) => {
  const user = req.session?.user;
  const { id } = req.params;

  if (!user) return res.status(401).send("No autenticado");

  let comentarios = readComments();
  const comentario = comentarios.find(c => c.id === parseInt(id));

  if (!comentario) return res.status(404).send("Comentario no encontrado");
  if (comentario.user !== user.username)
    return res.status(403).send("No autorizado");

  comentarios = comentarios.filter(c => c.id !== parseInt(id));
  saveComments(comentarios);

  res.sendStatus(204);
});

export default router;

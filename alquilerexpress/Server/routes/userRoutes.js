const { mostrar_todos_inmuebles } = require('../controllers/inmueble_controller')

const app = require('express').Router();

app.get('/', mostrar_todos_inmuebles);

module.exports = app;
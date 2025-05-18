const Inmueble = require ('../db/models/inmueble');
const sequelize = require('../db/db');

const mostrar_todos_inmuebles = async(req, res) => {
    try {
    const inmuebles = await Inmueble.findAll();

    if (inmuebles.length === 0) {
      return res.status(404).json({ message: 'No hay inmuebles disponibles' });
    }

    return res.json(inmuebles);
  } catch (err) {
    console.error('Error al obtener inmuebles:', err);
    return res.status(500).json({ error: 'Error en la base de datos' });
  }
};

module.exports = {mostrar_todos_inmuebles};


// models/InmuebleModel.js
import DBLocal from "db-local";

const { Schema } = new DBLocal({ path: './db' });

const Inmueble = Schema('Inmueble', {
  _id: { type: String, required: true },
  id: {type: String, required: true, unique: true }, // MongoDB uses _id as the primary key, but we keep id for compatibility
  titulo: { type: String, required: true },
  desc: { type: String, required: true },
  puntaje: { type: Number, required: true },
  precio: { type: Number, required: true },
  habitaciones: { type: Number, required: true },
  domicilio: { type: String, required: true },
  imagen: { type: String, required: true },
});

export default Inmueble;

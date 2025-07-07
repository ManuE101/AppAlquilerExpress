import DBLocal from "db-local";

const { Schema } = new DBLocal({ path: './db' });

const Reserva = Schema('Reserva', {
    _id: { type: String, required: true },
    inmueble_id: { type: String, required: true },
    user_id: { type: String, required: true },
    estado: { type: String, required: true },
    fecha_inicio: { type: Date, required: true },
    fecha_fin: { type: Date, required: true }
});

export default Reserva;

import DBLocal from "db-local"
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
dayjs.extend(isSameOrBefore);

const { Schema } = new DBLocal({path: './db'})

const Reserva = Schema('Reserva', {
    _id: {type: String, required:true},
    inmueble_id: {type: String, required:true},
    user_id: {type: String, required:true},
    estado: {type: String, required:true},
    fecha_inicio: {type: Date, required:true},
    fecha_fin: {type:Date, required:true}
})

function sobrepone(ini, fin, a, b){
    const iA = dayjs(ini);
    const fA = dayjs(fin);
    const iB = dayjs(a);
    const fB = dayjs(b);
    return (iA.isSameOrBefore(fB) && iB.isSameOrBefore(fA));
}

function checkSobrepone(fecha_inicio, fecha_fin, reservas){
    for (const reserva of reservas){
        if(sobrepone(fecha_inicio,fecha_fin,reserva.fecha_inicio,reserva.fecha_fin)){
            return true;
        }
    }
    return false;
}
export class ReservaRepository{
    static async create({ id_inmueble, user_id, fecha_inicio, fecha_fin }) {
        const reservas = await Reserva.find({ inmueble_id: id_inmueble });
        if (checkSobrepone(fecha_inicio, fecha_fin, reservas)) {
            return { ok: false, error: 'La reserva se superpone con otra existente' };
        }
        const idX = crypto.randomUUID();
        const est = 'activa';
        await Reserva.create({
            _id: idX,
            inmueble_id: id_inmueble,
            user_id,
            estado: est,
            fecha_inicio,
            fecha_fin
        }).save();
        return { ok: true, id_Reserva: idX };
    }

    static async getAll(){
        const reservas = await Reserva.find()
        return reservas
    }

    static async cancel({id_reserva}){
        console.log(id_reserva)
        const reserva = await Reserva.findOne({id_reserva});
        if(!reserva) throw new Error("Reserva no encontrada");
        reserva.estado = 'cancelada';
        await reserva.save();
        return { ok: true, id_Reserva: id_reserva};
    }
    static async puedeReservar({ id_inmueble, fecha_inicio, fecha_fin }) {
  const reservas = await Reserva.find({ inmueble_id: id_inmueble });
  if (checkSobrepone(fecha_inicio, fecha_fin, reservas)) {
    return { ok: false, error: 'La reserva se superpone con otra existente' };
  }
  return { ok: true };
}

    
}
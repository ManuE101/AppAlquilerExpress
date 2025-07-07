import DBLocal from "db-local"
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import { InmuebleRepository } from "./inmueble-repository.js";
dayjs.extend(isSameOrBefore);
import User from "../models/UserModel.js";
import Reserva from "../models/ReservaModel.js";




function calcularMonto(fecha_inicio, fecha_fin, precio_por_dia) {
  const inicio = dayjs(fecha_inicio);
  const fin = dayjs(fecha_fin);
  const dias = fin.diff(inicio, 'day'); // día de fin no incluido
  return dias * precio_por_dia;
}

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
        const reserva = await Reserva.findOne({_id: id_reserva});
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
static async createPresencial({ id_inmueble, fecha_inicio, fecha_fin, dni , precio }) {
    // Buscar cliente por DNI
console.log("DNI recibido para búsqueda:", dni);
    let cliente = await User.findOne({ dni});
    if (!cliente) {
      return { ok: false, error: 'Cliente no encontrado' };
    }
    const reservas = await Reserva.find({ inmueble_id: id_inmueble });
    if (checkSobrepone(fecha_inicio, fecha_fin, reservas)) {
      return { ok: false, error: 'La reserva se superpone con otra existente' };
    }

    const idX = crypto.randomUUID();
    await Reserva.create({
        _id: idX,
        inmueble_id: id_inmueble,
        user_id: cliente._id,
        estado: 'activa',
        fecha_inicio,
        fecha_fin,
    }).save();
    
    const monto = calcularMonto(fecha_inicio, fecha_fin, precio);
    return {
      ok: true,
      reserva: {
        id: idX,
        inmueble_id: id_inmueble,
        user_id: cliente._id,
        fecha_inicio,
        fecha_fin,
      },
      monto,
    };
    }

    static async getReservasEntre(fecha_inicio, fecha_fin){
        const reservas = await Reserva.find();
        return reservas.filter((reserva) =>
        sobrepone(fecha_inicio, fecha_fin, reserva.fecha_inicio, reserva.fecha_fin)
        );
    }

    static async getClientesQueReservaronEntre(fecha_inicio, fecha_fin){
        const reservas = await this.getReservasEntre(fecha_inicio, fecha_fin);
        const idsClientes = [...new Set(reservas.map(r => r.user_id))];
        return idsClientes;
    }

    static async getPrecioInmueblesEntre(fecha_inicio, fecha_fin){
        const reservas = await Reserva.find();
        const reservas_filtro = reservas.filter((reserva) =>
        reserva.estado === "activa" &&
        sobrepone(fecha_inicio, fecha_fin, reserva.fecha_inicio, reserva.fecha_fin)
        );
        let total = 0;
        for(const reserva of reservas_filtro){
            try{
                const inmueble = await InmuebleRepository.getById(reserva.inmueble_id);
                const inicio = dayjs(reserva.fecha_inicio);
                const fin = dayjs(reserva.fecha_fin);
                const dias = fin.diff(inicio, "day") + 1;

                total += dias * inmueble.precio;
            } catch (err){
                throw new Error("Inmueble no encontrado");
            }
        } 
        return total;
    }
}
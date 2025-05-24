import DBLocal from "db-local"
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
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
    return (isSameOrBefore(iA, fB) && isSameOrBefore(iB, fA));
}

function checkSobrepone(fecha_inicio, fecha_fin, reservas){
    for (const reserva of reservas){
        if(sobrepone(fecha_inicio,fecha_fin,reserva.fecha_inicio,reserva.fecha_fin)){
            return true;
        }
    }
    return false;
}
export class ReservaRepo{
    static async create({in_id, us_id, fecha_inicio, fecha_fin}){
        const reservas = await Reserva.find({inmueble_id: in_id})
        if(checkSobrepone(fecha_inicio,fecha_fin,reservas)) throw new Error('Fechas invalidas')
        const idX = crypto.randomUUID();
        const est = 'activa';
        await Reserva.create({
            _id: idX,
            inmueble_id: in_id,
            user_id: us_id,
            estado: est,
            fecha_inicio,
            fecha_fin
        }).save()
    }

    //static async cancel({in_id, us_id, fecha_inicio, fecha_fin}){

    //}
}
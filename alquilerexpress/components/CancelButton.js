"use client"

import { cancelarReserva } from "../utils/inmuebles_fetch"

export default function CancelButton({id_reserva, onCancel}) {
    const handleClick = async () => {
        const confirmar = window.confirm("¿Estás seguro de que querés cancelar esta reserva?");
        if (!confirmar) return;
        const res = await cancelarReserva(id_reserva);
        if(res.error){
            console.error("Error al cancelar la reserva:", res.error);
        } else {
            console.log("Reserva cancelada con éxito, ID de reserva:", res);
            if (onCancel) onCancel();
        }
    }
    return (
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-5"
        >
          Cancelar Reserva
        </button>
    )
}

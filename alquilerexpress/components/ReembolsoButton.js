"use client";

import { getReservasCanceladas, hacerReserva } from "../utils/inmuebles_fetch";
import { getInmuebleById } from "../utils/inmuebles_fetch";

export default function ReembolsoButton({ id_reserva }) {
  async function handleClick() {
    "use server";
    try {
      console.log("Pidiendo reembolso para reserva con ID:", id_reserva);

      // procesar reembolso
      const reserva = await getReservasCanceladas(id_cliente).findOne(id_reserva)

      if (getInmuebleById(reserva.inmueble_id).politica === 3){
         alert("La politica de cancelación no permite reembolsos");
         return;
      }

      alert("Reembolso en proceso");

    } catch (error) {
      console.error("Error en el proceso de reembolso:", error);
      alert("Ocurrió un error inesperado.");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-5"
    >
      Pedir reembolso
    </button>
  );
}
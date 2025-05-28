"use client";

import { getInmuebleById, hacerReserva } from "../utils/inmuebles_fetch";

export default function ReservaButton({ id_inmueble }) {
  async function handleClick() {
    try {
      console.log("Haciendo reserva para el inmueble con ID:", id_inmueble);
      const reserva = await getInmuebleById(id_inmueble);

      if (reserva?.error) {
        console.error("Error al registrar la reserva:", reserva.error);
        alert("Hubo un problema al registrar la reserva.");
        return;
      }

      const pagoRes = await fetch("/api/pagar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productoId: id_inmueble }),
      });

      const pagoData = await pagoRes.json();

      if (pagoData.error) {
        console.error("Error al generar la preferencia de pago:", pagoData.error);
        alert("No se pudo generar el link de pago.");
        return;
      }

      // redirigir al init_point de mp
      window.location.href = pagoData.init_point;

    } catch (error) {
      console.error("Error en el proceso de reserva y pago:", error);
      alert("Ocurrió un error inesperado.");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-5"
    >
      Reservar
    </button>
  );
}

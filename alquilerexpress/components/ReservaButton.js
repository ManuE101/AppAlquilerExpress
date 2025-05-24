"use client"
import { hacerReserva } from "../utils/inmuebles_fetch";

export default function ReservaButton({id_inmueble}) {

async function  handleClick() {
     console.log("Haciendo reserva para el inmueble con ID:", id_inmueble);
     const res = await hacerReserva(id_inmueble);
     if(res.error) {
         console.error("Error al hacer la reserva:", res.error);
        } else {
         console.log("Reserva realizada con éxito, ID de reserva:", res);
        }
      }

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-5"
    >
      Reservar
    </button>
  );
}